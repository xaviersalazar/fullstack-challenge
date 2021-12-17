import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Todo } from "./models/todo";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/todos", async (req, res) => {
  const items = await Todo.find({
    order: {
      sort: "ASC",
    },
  });
  res.send({ items });
});

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
