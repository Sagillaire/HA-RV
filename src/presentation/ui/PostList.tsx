import { PostCard } from "./PostCard";
import { usePosts } from "../hooks/usePosts";

export const PostList = () => {
  const { posts, isLoading, createPost, updatePost, deletePost } = usePosts();

  if (isLoading) return <p>Cargando publicaciones...</p>;

  return (
    <div>
      <h2>Publicaciones</h2>
      <button onClick={() => createPost.mutate({ title: "Nuevo Post", body: "Contenido", userId: 1 })}>
        Crear Post
      </button>
      <ul>
        {posts?.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onUpdate={(data) => updatePost.mutate({ id: post.id, data })}
            onDelete={() => deletePost.mutate(post.id)}
          />
        ))}
      </ul>
    </div>
  );
};
