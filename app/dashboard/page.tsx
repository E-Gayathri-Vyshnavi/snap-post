export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { createPost, deletePost } from "../actions";

interface Post {
  id: string;
  title: string;
  status: string;
  createdAt?: Date;
}

export default async function Dashboard() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-black">SnapPost Dashboard</h1>
      
      <form action={createPost} className="flex gap-2 mb-8">
        <input 
          name="title"
          type="text" 
          placeholder="Enter a post idea..." 
          className="border p-2 rounded flex-grow text-black bg-white"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Add
        </button>
      </form>

      <div className="space-y-4">
        {posts.map((post: Post) => (
          <div key={post.id} className="flex justify-between items-center border p-4 rounded shadow-sm bg-white">
            <span className="text-gray-800 font-medium">{post.title}</span>
            
            <form action={deletePost.bind(null, post.id)}>
              <button className="text-red-500 hover:text-red-700 hover:underline text-sm font-semibold">
                Delete
              </button>
            </form>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="text-gray-500 text-center py-10">
            No posts yet. Add your first idea above!
          </p>
        )}
      </div>
    </div>
  );
}