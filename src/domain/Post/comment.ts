import { z } from "zod";

// 📌 Esquema de validación (Reglas de negocio)
export const CommentSchema = z.object({
  id: z.number().int().positive(),
  email: z.string().email("El email no es válido"),
  postId: z.number().int().positive("Falta post asociado"),
  name: z.string().min(1, "El nombre no puede estar vacío"),
  body: z.string().min(1, "El comentario no puede estar vacío"),
});

// 📌 Tipos inferidos desde el esquema
export type Comment = z.infer<typeof CommentSchema>;

// 📌 Interfaz del repositorio
export interface ICommentRepository {
  getCommentsForPost(postId: number): Promise<Comment[]>;
}

// 📌 Función para validar un nuevo comentario
export const createComment = (comment: Omit<Comment, "id">) =>
  CommentSchema.omit({ id: true }).parse(comment);
