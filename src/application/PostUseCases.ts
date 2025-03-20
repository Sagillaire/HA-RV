import { Comment, createPost, ICommentRepository, IPostRepository, Post } from "../domain";

// 📌 Separamos la lógica de negocio en funciones puras
export const PostUseCases = (repository: IPostRepository) => ({
  getAllPosts: async (): Promise<Post[]> => repository.getAll(),

  getSinglePost: async (id: number): Promise<Post> => repository.getById(id),

  createNewPost: async (data: Omit<Post, "id">): Promise<Post> => {
    const validPost = createPost(data);
    return repository.create(validPost);
  },

  updateExistingPost: async (id: number, data: Partial<Post>): Promise<Post> =>
    repository.update(id, data),

  patchPostData: async (id: number, data: Partial<Post>): Promise<Post> =>
    repository.patch(id, data),

  removePost: async (id: number): Promise<void> => repository.delete(id),
});

// 📌 Separamos la lógica de negocio en funciones puras
export const CommentUseCases = (repository: ICommentRepository) => ({
  getCommentsForPost: async (postId: number): Promise<Comment[]> =>
    repository.getCommentsForPost(postId),
});
