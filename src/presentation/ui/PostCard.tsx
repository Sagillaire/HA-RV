interface PostCardProps {
  post: { id: number; title: string; body: string };
  onUpdate: (data: { title: string }) => void;
  onDelete: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onUpdate, onDelete }) => {
  return (
    <li>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={() => onUpdate({ title: "Actualizado" })}>Editar</button>
      <button onClick={onDelete}>Eliminar</button>
    </li>
  );
};
