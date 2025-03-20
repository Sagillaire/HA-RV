import { z } from "zod";

// 📌 Esquema de validación (Reglas de negocio)
export const PostSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive("Falta usuario creador"),
  title: z.string().min(1, "El título no puede estar vacío"),
  body: z.string().min(1, "El contenido no puede estar vacío"),
});

// 📌 Tipos inferidos desde el esquema
export type Post = z.infer<typeof PostSchema>;

// 📌 Interfaz del repositorio
export interface IPostRepository {
  getAll(): Promise<Post[]>;
  getById(id: number): Promise<Post>;
  create(data: Omit<Post, "id">): Promise<Post>;
  update(id: number, data: Partial<Post>): Promise<Post>;
  patch(id: number, data: Partial<Post>): Promise<Post>;
  delete(id: number): Promise<void>;
}

// 📌 Función para validar un nuevo post
export const createPost = (post: Omit<Post, "id">) =>
  PostSchema.omit({ id: true }).parse(post);
