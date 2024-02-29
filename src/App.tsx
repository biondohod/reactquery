import { QueryClient, useQuery } from "@tanstack/react-query";
import "./App.css";
import { fetchPosts } from "./api/api";
import PostList from "./components/PostsList";
import { useState } from "react";

function App() {
  const [toggle, setToggle] = useState(true);
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  console.log(data, isLoading);

  return (
    <>
      <div>
        <h2 className="title">My posts</h2>
        <button onClick={() => {setToggle(!toggle)}}>Toggle</button>
        {toggle && <PostList/>}
      </div>
    </>
  );
}

export default App;
