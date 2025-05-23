import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-indigo-600 mb-4">Welcome to Dave Blog</h1>
      <p className="text-lg text-gray-700 mb-8">
        Discover insightful articles, stories, and updates from our writers.
      </p>

      <Button asChild variant="indigo">
        <Link
          href="/dave_blog"
        >
          Go to Blog Post
        </Link>
      </Button>

    </main>
  );
}
