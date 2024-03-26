import { useState } from "react";
import { useProjects } from "../services/queries";

const Projects = () => {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error, isPlaceholderData, isFetching } =
    useProjects(page);

  const handleNextPage = () => {
    if (!isPlaceholderData) {
      setPage((old) => Math.max(0, (old + 1)));
    }
  }

  const handlePreviousPage = () => {
    if (page>1)
    setPage((old) => Math.max(0, (old - 1)));
  }

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      {data.map((project) => {
        return (
          <li key={project.id}>
            <h3>{project.name}</h3>
          </li>
        );
      })}
      <span>Current page: {page}</span>
      <br />
      <button onClick={handlePreviousPage} disabled={page <= 1}>Previous page</button>
      <button onClick={handleNextPage} disabled={isPlaceholderData}>Next page</button>
      <br />
      {isFetching ? 'Loading...' : ''}
    </>
  );
};

export default Projects;
