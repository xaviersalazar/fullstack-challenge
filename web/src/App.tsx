import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { Todo } from "./components/todo/Todo";
import { Form } from "./components/form/Form";
import { editTodo, getTodos, postTodo, resortTodos } from "./api";
import "./App.css";

type Todo = {
  id?: number;
  name: string;
  completed: boolean;
  sort: number;
};

function App() {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    getTodos()
      .then((res) => {
        if (res) {
          setTodos(res)
        }
      });
  }, []);
  
  const addTodo = (todo: Todo) => {
    postTodo(todo)
      .then((res) => setTodos(res));
  }

  const updateTodo = (todo: Todo) => {
    editTodo(todo)
      .then((res) => setTodos(res));
  };

  const sortTodos = (todo: Todo) => {
    resortTodos(todo)
      .then((res) => setTodos(res));
  }

  return (
    <Container className="main-container">
      <h1 className="heading">todos</h1>
      <Container maxWidth="md">
        <Form addTodo={addTodo} />
        {todos.length > 0 ? (
          <Box>
            {todos.map((item: Todo, i: number) => (
              <Todo 
                key={item.id}
                updateTodo={updateTodo} 
                sortTodos={sortTodos}
                isLastItem={i === todos.length - 1} 
                {...item} />
            ))}
          </Box>
        ) : <h4>No items added yet</h4>}
      </Container>
    </Container>
  );
}

export default App;
