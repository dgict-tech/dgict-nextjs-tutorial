const BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

export async function fetchAllPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`);
  const data: Post[] = await res.json();
  const posts = data.slice(0, 10);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return posts;
}
