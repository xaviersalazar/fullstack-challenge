import express from "express";
const router = express.Router();
import { Request, Response } from "express";
import { Todo } from "../models/todo";

router
  .route("/")
    .get((req: Request, res: Response) => getTodos(req, res))
    .post((req: Request, res: Response) => postTodo(req, res))
    .put((req: Request, res: Response) => editTodo(req, res))

const getTodos = async (req: Request, res: Response) => {
  const items = await Todo.find({
    order: {
      sort: "ASC",
    },
  });

  if (!items || items.length <= 0) {
    res.send({ error: "No items found" });
  }

  res.send({ items });
};

const postTodo = async (req: Request, res: Response) => {
  try {
    const todo = req.body as Todo;

    const todosSize = await Todo.count();
    todo.sort = todosSize + 1;

    await Todo.save(todo);

    const todos = await Todo.find({
      order: {
        sort: "ASC",
      },
    });

    res.send(todos);
  } catch (e) {
    res.send({ error: 'Error saving a new todo item!' });
  }
};

const editTodo =  async (req: Request, res: Response) => {
  try {
    const todo = req.body as Todo;
    
    await Todo.save(todo);

    const todos = await Todo.find({
      order: {
        sort: "ASC",
      },
    });

    res.send(todos);
  } catch (e) {
    res.send({ error: 'Error updating todo!'})
  }
};

module.exports = router;