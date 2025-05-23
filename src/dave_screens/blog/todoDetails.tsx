'use client';

import { useParams } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TodoDetails() {
  const { id } = useParams();
  const postId = Number(id);

  const post = useAppSelector(state =>
    state.posts.items.find(p => p.id === postId)
  );

  if (!post) return notFound();

  return (
    <div className="px-24 py-6 min-h-screen bg-gray-100">
      <div className='flex justify-between'>
        <h2 className="text-4xl font-bold mb-4">Post details</h2>
        <Button variant="indigo">
          <Link href="/dave_blog">
            Back to Blog posts
          </Link>
        </Button>
      </div>
      <div className='bg-gray-100 mt-24 py-24 px-12 rounded-lg shadow-md w-[60%] mx-auto'>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700 text-lg leading-relaxed">{post.body}</p>
      </div>
    </div>
  );
}
