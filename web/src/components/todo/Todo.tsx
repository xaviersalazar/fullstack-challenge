import React, { useEffect, useState } from "react";
import { Checkbox, Stack, IconButton, TextField } from "@mui/material";
import { ArrowUpwardOutlined, ArrowDownwardOutlined, CancelOutlined, CheckCircleOutline } from '@mui/icons-material';
import "./Todo.css";

interface TodoProps {
  id?: number;
  name: string;
  completed: boolean;
  sort: number;
  updateTodo: Function;
  sortTodos: Function;
  isLastItem: boolean;
};

const colors = [
  '#55efc4',
  '#81ecec',
  '#74b9ff',
  '#a29bfe',
  '#dfe6e9',
  '#ffeaa7',
  '#fab1a0',
  '#ff7675',
  '#fd79a8',
  '#b2bec3'
]

export const Todo = (
  { id, name, completed, sort, updateTodo, sortTodos, isLastItem }: TodoProps,
) => {
  const [background, setBackground] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setBackground(colors[Math.floor(Math.random()*colors.length)] )
  }, [])

  const onArrowUp = () => {
    const newSortedTodo = {
      id,
      name,
      completed,
      sort: sort - 1,
    };

    sortTodos(newSortedTodo);
  };

  const onArrowDown = () => {
    const newSortedTodo = {
      id,
      name,
      completed,
      sort: sort + 1,
    };

    sortTodos(newSortedTodo);
  };

  const handleSaveName = () => {
    const updatedTodo = {
      id,
      name: value,
      completed,
      sort
    };

    updateTodo(updatedTodo);

    setIsEdit(false);
    setValue('');
  }

  const handleCompletedChange = () => {
    const checked = !completed;
    const updatedTodo = {
      id,
      name,
      completed: checked,
      sort
    };

    updateTodo(updatedTodo);
  }

  return (
    <div className="todo-container" style={{ 
      background
    }}>
      <div className="todo-item">
        {!isEdit ? (
          <>
            <Stack direction="row" spacing={0.5}>
              {sort !== 0 && (
                <IconButton 
                  className="arrow-up" 
                  onClick={onArrowUp}
                >
                  <ArrowUpwardOutlined />
                </IconButton>
              )}
              {!isLastItem && (
                <IconButton 
                  className="arrow-down" 
                  onClick={onArrowDown}
                >
                  <ArrowDownwardOutlined />
                </IconButton>
              )}
            </Stack>
            <h4 onClick={() => setIsEdit(true)}>{name}</h4>
            <Checkbox
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              checked={completed}
              onChange={handleCompletedChange}
            />
          </>
        ) : (
          <>
            <TextField
              id="edit-name"
              label="edit name"
              value={value}
              placeholder={name.toLowerCase()}
              onChange={(e) => setValue(e.target.value)}
            />
            <Stack direction="row" spacing={0}>
              <IconButton 
                className="save" 
              >
                <CheckCircleOutline onClick={handleSaveName} />
              </IconButton>
              <IconButton 
                className="cancel" 
              >
                <CancelOutlined onClick={() => setIsEdit(false)} />
              </IconButton>
            </Stack>
          </>
        )}
      </div>
    </div>
  )
};