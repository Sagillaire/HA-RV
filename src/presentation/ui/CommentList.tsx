interface Comment {
  id: number;
  body: string;
}

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div>
      <h4>Comentarios</h4>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
