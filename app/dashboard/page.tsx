export const dynamic = "force-dynamic";

import { createPost, deletePost } from "../actions";

interface Post {
  id: string;
  title: string;
  status: string;
}

export default async function Dashboard() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  const posts: Post[] = await res.json();

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-black">
        SnapPost Dashboard
      </h1>

      <form action={createPost} className="flex gap-2 mb-8">
        <input
          name="title"
          type="text"
          placeholder="Enter a post idea..."
          className="border p-2 rounded flex-grow text-black bg-white"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex justify-between border p-4 rounded bg-white"
          >
            <span>{post.title}</span>

            <form action={deletePost.bind(null, post.id)}>
              <button className="text-red-500">Delete</button>
            </form>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="text-gray-500 text-center py-10">
            No posts yet.
          </p>
        )}
      </div>
    </div>
  );
}