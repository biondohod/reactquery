import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateTodo } from "../services/mutations";
import { useTodos, useTodosIds, useTodosList } from "../services/queries";
import { Todo } from "../types/todo";

const Todos = () => {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);
  // const todosList = useTodosList();
  const createTodoMutation = useCreateTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };

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
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
