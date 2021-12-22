const API_URL = 'http://localhost:5000';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

type Todo = {
  id?: number;
  name: string;
  completed: boolean;
  sort?: number;
};

const getTodos = async () => {
  return fetch(`${API_URL}/todos`, { headers })
    .then((res) => res.json())
    .then((res) => res.items);
};

const postTodo = async (item: Todo) => {
  return fetch(`${API_URL}/todos`, {
    method: 'POST',
    body: JSON.stringify(item),
    headers
  })
    .then((res) => res.json())
}

const editTodo = async (item: Todo) => {
  return fetch(`${API_URL}/todos`, {
    method: 'PUT',
    body: JSON.stringify(item),
    headers
  })
    .then((res) => res.json())
};

const resortTodos = async (item: Todo) => {
  return fetch(`${API_URL}/sort`, {
    method: 'PUT',
    body: JSON.stringify(item),
    headers
  })
    .then((res) => res.json())
}

export {
  getTodos,
  postTodo,
  editTodo,
  resortTodos
};
