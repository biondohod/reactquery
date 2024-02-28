import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { fetchPosts } from "./api/api";

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  console.log(data, isLoading);

  return (
    <>
      <div></div>
    </>
  );
}

export default App;
