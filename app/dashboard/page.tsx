import { prisma } from "@/lib/prisma";
import { createPost, deletePost } from "../actions";

export default async function Dashboard() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">SnapPost Dashboard</h1>
      
      {/* Create Form */}
      <form action={createPost} className="flex gap-2 mb-8">
        <input 
          name="title"
          type="text" 
          placeholder="Enter a post idea..." 
          className="border p-2 rounded flex-grow text-black"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add
        </button>
      </form>

      {/* List Display */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="flex justify-between items-center border p-4 rounded shadow-sm bg-white">
            <span className="text-gray-800">{post.title}</span>
            <form action={deletePost.bind(null, post.id)}>
              <button className="text-red-500 hover:underline text-sm">Delete</button>
            </form>
          </div>
        ))}
        {posts.length === 0 && <p className="text-gray-500">No posts yet. Add one above!</p>}
      </div>
    </div>
  );
}