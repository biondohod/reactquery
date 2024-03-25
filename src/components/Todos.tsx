import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutations";
import { useTodos, useTodosIds, useTodosList } from "../services/queries";
import { Todo } from "../types/todo";

const Todos = () => {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);
  // const todosList = useTodosList();
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };

  const handleMarkAsDoneSubmit = (id: number | undefined) => {
    if (id) {
      updateTodoMutation.mutate(id);
    }
  };

  const handleDeleteTodoSubmit = async (id: number | undefined) => {
    if (id) {
      await deleteTodoMutation.mutateAsync(id);
      console.log("done async mutate")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>new todo:</h4>
        <input type="text" placeholder="title" {...register("title")} />
        <br />
        <input
          type="text"
          placeholder="description"
          {...register("description")}
        />
        <br />
        <input
          type="submit"
          disabled={createTodoMutation.isPending}
          value={createTodoMutation.isPending ? "Creating..." : "Create Todo"}
        />
      </form>
      <ul>
        {todosQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>id: {data?.id}</div>
            <span>
              <strong>Title: {data?.title}</strong>
            </span>
            &nbsp;
            <span>Description: {data?.description}</span>
            <div>
              <button
                onClick={() => handleMarkAsDoneSubmit(data?.id)}
                disabled={data?.checked}
              >
                {data?.checked ? "Done" : "Mark as Done"}
              </button>
              <button onClick={() => handleDeleteTodoSubmit(data?.id)}>Delete todo</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
