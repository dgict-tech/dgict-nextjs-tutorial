"use client"; // Next.js directive to mark this as a client-side component

import React, { useEffect, useState } from "react"; // Import React and hooks

// Define TypeScript interface for a blog post
interface Post {
  id: number;
  title: string;
  body: string;
}

// Define TypeScript interface for a comment
interface Comment {
  id: number;
  name: string;
  body: string;
}

const BlogPage = () => {
  // State to store all posts fetched from API
  const [posts, setPosts] = useState<Post[]>([]);

  // State to store comments for the selected post
  const [comments, setComments] = useState<Comment[]>([]);

  // State to track which post's comments are currently shown
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // State to manage input value for new post title
  const [newTitle, setNewTitle] = useState("");

  // State to manage input value for new post body
  const [newBody, setNewBody] = useState("");

  // useEffect runs once after component mounts to fetch posts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts") // Fetch posts from JSONPlaceholder API
      .then((res) => res.json()) // Parse response JSON
      .then((data) => setPosts(data)); // Store posts in state
  }, []);

  // Function to create a new post by sending a POST request to the API
  const createPost = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST", // HTTP POST method
      headers: { "Content-type": "application/json; charset=UTF-8" }, // JSON headers
      body: JSON.stringify({
        title: newTitle, // Title from input
        body: newBody, // Body from input
        userId: 1, // Dummy userId for API
      }),
    });

    const data = await res.json(); // Get response data

    setPosts([data, ...posts]); // Add new post at the beginning of posts list
    setNewTitle(""); // Clear title input field
    setNewBody(""); // Clear body input field
  };

  // Function to delete a post by sending a DELETE request to the API
  const deletePost = async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    setPosts(posts.filter((post) => post.id !== id)); // Remove post from local state
  };

  // Function to fetch comments for a specific post
  const fetchComments = async (postId: number) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}` // Fetch comments filtered by postId
    );
    const data = await res.json();
    setComments(data); // Store fetched comments in state
    setSelectedPostId(postId); // Set which post's comments to display
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {" "}
      {/* Container div with max width and padding */}
      <h1 className="text-3xl font-bold mb-6 text-center">📝 My Blog</h1>{" "}
      {/* Page title */}
      {/* Section to create a new post */}
      <div className="mb-10 bg-white shadow-md p-5 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>

        {/* Input for post title */}
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)} // Update newTitle state on input change
          className="w-full border rounded p-2 mb-3"
        />

        {/* Textarea for post body */}
        <textarea
          placeholder="Body"
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)} // Update newBody state on input change
          className="w-full border rounded p-2 mb-3"
        ></textarea>

        {/* Button to trigger post creation */}
        <button
          onClick={createPost}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Post
        </button>
      </div>
      {/* List of all posts */}
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-md rounded-lg mb-6 p-5">
          {/* Link to a blog post detail page */}
          <a
            href={`/blog/${post.id}`}
            className="text-lg font-semibold text-blue-600 hover:underline"
          >
            {post.title}
          </a>

          {/* Post body */}
          <p className="mb-4 text-gray-700">{post.body}</p>

          {/* Buttons for deleting post and showing comments */}
          <div className="flex gap-4">
            <button
              onClick={() => deletePost(post.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Delete
            </button>

            <button
              onClick={() => fetchComments(post.id)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded"
            >
              Show Comments
            </button>
          </div>

          {/* Show comments if this post is selected */}
          {selectedPostId === post.id && (
            <div className="mt-4">
              <h4 className="font-semibold text-sm text-gray-800 mb-2">
                Comments:
              </h4>

              {/* If no comments, show placeholder text */}
              {comments.length === 0 ? (
                <p className="text-sm text-gray-500">No comments yet.</p>
              ) : (
                // Map over comments and display each
                comments.map((comment) => (
                  <div key={comment.id} className="border-t py-2 text-sm">
                    <p className="font-medium text-gray-800">{comment.name}</p>
                    <p className="text-gray-600">{comment.body}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
