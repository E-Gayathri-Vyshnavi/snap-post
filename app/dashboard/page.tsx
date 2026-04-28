import { prisma } from "@/lib/prisma";
import { createPost, deletePost } from "../actions";

// Define the shape of a Post so TypeScript doesn't throw an 'any' error
interface Post {
  id: string;
  title: string;
  status: string;
  createdAt?: Date; // Optional, depending on your schema
}

export default async function Dashboard() {
  // Fetch posts from your Vercel/Prisma database
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-black">SnapPost Dashboard</h1>
      
      {/* Create Form - Uses Next.js Server Actions */}
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

      {/* List Display */}
      <div className="space-y-4">
        {posts.map((post: Post) => ( // 👈 The critical fix: added ": Post"
          <div key={post.id} className="flex justify-between items-center border p-4 rounded shadow-sm bg-white">
            <span className="text-gray-800 font-medium">{post.title}</span>
            
            {/* Delete Form - Uses .bind to pass the ID to the Server Action */}
            <form action={deletePost.bind(null, post.id)}>
              <button className="text-red-500 hover:text-red-700 hover:underline text-sm font-semibold">
                Delete
              </button>
            </form>
          </div>
        ))}

        {/* Empty State */}
        {posts.length === 0 && (
          <p className="text-gray-500 text-center py-10">No posts yet. Add your first idea above!</p>
        )}
      </div>
    </div>
  );
}