import React, { useState } from "react";
import { Container, TextField, Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import "./Form.css";

const AddButton = styled(Button)({
  textTransform: 'none'
});

export const Form = ({ addTodo }: any) => {
  const [name, setName] = useState('');

  const handleAdd = () => {
    const todo = {
      name,
      completed: false,
    };

    addTodo(todo);
  };

  return (
    <Container maxWidth="sm">
      <div className="item-form">
        <TextField
          id="name"
          label="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <AddButton 
          className="add-button" 
          variant="contained" 
          onClick={handleAdd}
          disableElevation
        >
          add an item
        </AddButton>
      </div>
    </Container>
  )
}