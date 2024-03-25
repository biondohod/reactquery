import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/todo";
import { createTodo, deleteTodo, updateTodo } from "./api";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onMutate: () => {
      console.log("mutate");
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: () => {
      console.log("success");
    },
    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => updateTodo(id),
    onSettled: async (_, error, id) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
        await queryClient.invalidateQueries({
          queryKey: ["todo", { id }],
        });
      }
    },
  });
}


export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
}
