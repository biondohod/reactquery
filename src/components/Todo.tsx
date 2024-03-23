import { useTodos, useTodosIds } from "../services/queries";

const Todo = () => {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  return (
    <>
      <ul>
        {todosQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>id: {data?.id}</div>
            <span>
              <strong>Title: {data?.title}</strong>
            </span>
            <br />
            <span>Description: {data?.description}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
