import axios from "axios";
import { Todo } from "../types/todo";
import { Project } from "../types/project";
import { Product } from "../types/product";

const BASE_URL = "http://localhost:3000";
const axiosInstanse = axios.create({ baseURL: BASE_URL });

export const getTodosIds = async () => {
  return (await axiosInstanse.get<Todo[]>("todos")).data.map((todo) => todo.id);
};

export const getTodo = async (id: number) => {
  return (await axiosInstanse.get<Todo>(`todos/${id}`)).data;
};

export const getTodosList = async () => {
  return (await axiosInstanse.get<Todo[]>("todos")).data;
};

export const createTodo = async (data: Todo) => {
  await axiosInstanse.post("todos", data);
};

export const updateTodo = async (id: number) => {
  await axiosInstanse.patch(`todos/${id}`, { checked: true });
};

export const deleteTodo = async (id: number) => {
  await axiosInstanse.delete(`todos/${id}`);
};

export const getProjects = async (page: number = 1, limit: number = 3) => {
  return (
    await axiosInstanse.get<Project[]>(`projects?_page=${page}&_limit=${limit}`)
  ).data;
};

export const getProducts = async ({ pageParam }: { pageParam: number }) => {
  return (
    await axiosInstanse.get<Product[]>(
      `products?_page=${pageParam + 1}&_limit=3`
    )
  ).data;
};

export const getProduct = async (id: number) => {
  return (await axiosInstanse.get<Product>(`products/${id}`)).data;
};
