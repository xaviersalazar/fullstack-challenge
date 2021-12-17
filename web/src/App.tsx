import { Container, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";

type Todo = {
  id?: number;
  name: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const todo = {
      name: e.target.name.value,
      completed: false,
    };
    e.target.name.value = "";

    // TODO: Write to the database and update the list of todos
    console.log(todo);
  };

  const getTodos = async () => {
    return fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((res) => res.items);
  };

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <Container>
      <ul>
        {todos.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} method="post">
        <input name="name" type="text" />
        <input type="submit" value="Add an Item" />
      </form>
    </Container>
  );
}

const styles = {};
export default App;
