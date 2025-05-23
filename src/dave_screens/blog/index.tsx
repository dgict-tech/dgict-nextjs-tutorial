'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { deletePost, fetchPosts, loadFromStorage, loadPosts, updatePost } from '@/store/reducers/postsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea';
import { Post } from '@/store/types';

export default function BlogPage() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector(state => state.posts);
  // const [items, setItems] = useState<Post[]>([]);

  const [editPost, setEditPost] = useState<{ id: number; title: string; body: string } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);


  // useEffect(() => {
  //   dispatch(fetchPosts());
  //   const data = localStorage.getItem('my-posts');
  //   const posts = data ? JSON.parse(data) : [];
  //   setItems(posts);
  // }, []);

  const handleUpdate = () => {
    if (editPost) {
      dispatch(updatePost(editPost));
      setEditPost(null);
      setDialogOpen(false);
    }
  };


  return (
    <div className="py-6 px-24 h-screen bg-gray-100">
      <div className="flex justify-between mb-6">
        <h1 className="text-4xl font-bold">My Blog Posts</h1>
        <Button asChild variant="indigo">
          <Link href="/dave_blog/create">
            Create Post
          </Link>
        </Button>
      </div>
      <div className="space-y-4 mt-12">
        {status === 'succeeded' ? (
          items.map(post => (
            <div key={post.id} className="p-4 border rounded shadow-sm bg-white space-y-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.body}</p>
              <div className="mt-2 space-x-4">

                <Link href={`/dave_blog/${post.id}`}>
                  <Button size="sm" variant='indigo' className='cursor-pointer'>
                    View Post
                  </Button>
                </Link>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className='cursor-pointer' onClick={() => {
                      setEditPost(post)
                      setDialogOpen(true);
                    }}>
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Edit Post</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Title"
                        value={editPost?.title || ''}
                        onChange={e => setEditPost(prev => prev ? { ...prev, title: e.target.value } : null)}
                      />
                      <Textarea
                        placeholder="Body"
                        rows={5}
                        value={editPost?.body || ''}
                        onChange={e => setEditPost(prev => prev ? { ...prev, body: e.target.value } : null)}
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setEditPost(null)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUpdate}>Save</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="destructive"
                  className="cursor-pointer"
                  onClick={() => dispatch(deletePost(post.id))}
                >

                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>Post loading...</p>
        )}
      </div>
    </div>
  );
}

