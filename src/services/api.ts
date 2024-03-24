import axios from "axios";
import { Todo } from "../types/todo";

const BASE_URL = "http://localhost:3000";
const axiosInstanse = axios.create({ baseURL: BASE_URL });

export const getTodosIds = async () => {
  return (await axiosInstanse.get<Todo[]>('todos')).data.map((todo) => todo.id)
};

export const getTodo = async (id: number) => {
  return (await axiosInstanse.get<Todo>(`todos/${id}`)).data;
}

export const getTodosList = async () => {
  return (await axiosInstanse.get<Todo[]>('todos')).data;
}

export const createTodo = async (data: Todo) => {
  await axiosInstanse.post('todos', data);
}