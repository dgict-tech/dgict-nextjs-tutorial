import React from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  name: string;
  body: string;
  email: string;
}

const getPost = async (id: string): Promise<Post> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
};

const getComments = async (id: string): Promise<Comment[]> => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );
  return res.json();
};

const PostPage = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);
  const comments = await getComments(params.id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-8">{post.body}</p>

      <h2 className="text-xl font-semibold mb-2">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border p-4 rounded-lg bg-gray-50">
            <p className="font-semibold text-gray-800">{comment.name}</p>
            <p className="text-gray-600 italic text-sm mb-1">{comment.email}</p>
            <p className="text-gray-700">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
