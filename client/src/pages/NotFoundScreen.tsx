import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function NotFoundScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-9xl font-extrabold text-slate-900 dark:text-slate-50">
        404
      </h1>

      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>

      <Link to="/" className="mt-4">
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
}
