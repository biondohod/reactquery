import { addPost, fetchPosts, fetchTags } from "@/api/api";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const PostList = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const {
    data: postData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", { page }],
    queryFn: () => fetchPosts(page),
    // gcTime: 0,
    // refetchInterval: 1000 * 5
  });

  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const {
    mutate,
    isError: isPostError,
    isPending,
    error: postError,
    reset,
  } = useMutation({
    mutationFn: addPost,
    onMutate: () => {
      id: 1;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["posts", { page: 1 }],
        exact: true,
        // predicate: (query: any) =>
        //   query.queryKey[0] === "posts" && query.queryKey[1].page >= 2,
      });
    },
    // onError: (error, variables, context) => {alert("error")},
    // onSettled: (data, error, variables, context,) => {}
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const tags = Array.from(formData.keys()).filter(
      (key) => formData.get(key) === "on"
    );
    if (!title || !tags) return;
    mutate({ id: postData?.data?.lenght + 1, title, tags });
    e.target.reset();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {isPostError && (
          <h5 onClick={() => reset()}>
            Unable to Post cuz {postError.message}
          </h5>
        )}
        <input
          type="text"
          placeholder="Enter your post.."
          className="postbox"
          name="title"
        />
        <div className="tags">
          {tagsData?.map((tag: any) => {
            return (
              <div key={tag}>
                <input name={tag} id={tag} type="checkbox" />
                <label htmlFor={tag}>{tag}</label>
              </div>
            );
          })}
        </div>
        <button disabled={isPending}>
          {isPending ? "Posting..." : "Post"}
        </button>
      </form>
      {isLoading && isPending && <p>Loading...</p>}
      {isError && <p>{error?.message}</p>}

      <div className="pages">
        <button onClick={() => setPage((oldPage) => Math.max(oldPage - 1, 0))} disabled={!postData?.prev}>Previous page</button>
        <span>{page}</span>
        <button onClick={() => setPage((oldPage) => oldPage + 1)} disabled={!postData?.next}>Next page</button>
      </div>
      {postData &&
        postData.data.map((post: any) => {
          return (
            <div key={post.id} className="post">
              <div>{post.title}</div>
              {post.tags.map((tag: string) => (
                <span>{tag}</span>
              ))}
            </div>
          );
        })}
    </div>
  );
};

export default PostList;
