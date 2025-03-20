import { Comment, ICommentRepository } from "../../domain";
import { IPostRepository, Post } from "../../domain/Post/post";
import { ApiService } from "../config/ApiService";

const postService = new ApiService("/posts", "BASE");

export const PostRepository: IPostRepository = {
  getAll: async () => postService.findAll<Post[]>(),

  getById: async (id) => postService.get<Post>(id),

  create: async (data) => postService.create<Post>(data),

  update: async (id, data) => postService.update<Post>(id, data),

  patch: async (id, data) => postService.patch<Post>(id, data),

  delete: async (id) => postService.remove<void>(id),
};

const commentService = new ApiService("/comments", "BASE");

export const commentRepository: ICommentRepository = {
  getCommentsForPost: async (postId) =>
    commentService.findAll<Comment[]>("", { postId }),
};
