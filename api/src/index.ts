import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Request, Response } from "express";
import { Todo } from "./models/todo";

// @ts-ignore
Array.prototype.insert = function(arr: Todo[], index: number, newItem: Todo) {
  return [...arr.slice(0, index), newItem, ...arr.slice(index)]
};

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/todos", require('./routes/todos'))

app.use("/sort", async (req: Request, res: Response) => {
  try {
    const todo = req.body as Todo;
    const items = await Todo.find({
      order: {
        sort: "ASC",
      },
    });
    const filteredItems = items.filter((i) => i.id !== todo.id) as any;

    const sortedItems = filteredItems
      .insert(filteredItems, todo.sort, todo) 
      .map((item: Todo, i: number) => ({ ...item, sort: i }))
    
    sortedItems.forEach(async (item: Todo) => await Todo.save(item));

    res.send(sortedItems);
  } catch (e) {
    res.send('Error sorting items!')
  }
})

createConnection({
  type: "sqlite",
  database: `${__dirname}/../todo.db`,
  logging: true,
  entities: [Todo],
  namingStrategy: new SnakeNamingStrategy(),
})
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}...`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
