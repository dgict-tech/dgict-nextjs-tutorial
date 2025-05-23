'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { addPost } from '@/store/reducers/postsSlice';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;
    dispatch(addPost({ title, body }));
    router.push('/dave_blog');
  };

  return (
    <div className="py-6 px-24 h-screen bg-gray-100">
      <div className='flex justify-between mb-6'>
        <h1 className="text-4xl font-bold mb-4">Create New Post</h1>
        <Button variant="indigo">
          <Link href="/dave_blog">
            Back to Blog posts
          </Link>
        </Button>
      </div>
      <div className='bg-gray-100 mt-24 py-24 px-12 rounded-lg shadow-md w-[40%] mx-auto'>
        <h1 className="text-2xl font-bold mb-4">New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text"
          placeholder="Title"
          value={title}
          className='border-black'
          onChange={e => setTitle(e.target.value)}
          />
          <Textarea
          placeholder="Description"
          className='border-black'
          value={body}
          onChange={e => setBody(e.target.value)}
           />
           <Button
           type="submit"
           variant='indigo'
           >
            Create
           </Button>
      </form>
      </div>
    </div>
  );
}
