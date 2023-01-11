import { useQuery } from "@tanstack/react-query";

const useBlogPost = (postId) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["posts", postId],
    queryFn: async () => {
      data = axios.get(`https://heyfarming.com/wp-json/wp/v2/blog/${postId}`);
      return data;
    },
  });
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  console.log({ data, isLoading });
  return { data, isLoading };
};

export default useBlogPost;
