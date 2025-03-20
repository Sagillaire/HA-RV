import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PostUseCases } from "../../application";
import { Post } from "../../domain";
import { PostRepository } from "../../infrastructure/api/postRepository";

const postUseCases = PostUseCases(PostRepository);

export const usePosts = () => {
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: postUseCases.getAllPosts,
  });

  const createPost = useMutation({
    mutationFn: (payload: Omit<Post, "id">) =>  postUseCases.createNewPost(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const updatePost = useMutation<Post, Error, { id: number; data: Partial<Post> }>({
    mutationFn: ({ id, data }: { id: number; data: Partial<Post> }) => postUseCases.updateExistingPost(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const deletePost = useMutation({
    mutationFn: postUseCases.removePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  return { posts, isLoading, createPost, updatePost, deletePost };
};
