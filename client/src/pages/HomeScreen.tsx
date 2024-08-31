import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[75vh] p-4">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold">Welcome to Customer Connect</h1>
        <p className="text-lg mt-2">
          Your gateway to managing customer relationships effectively.
        </p>
      </header>

      <Link to="/auth">
        <Button>Login</Button>
      </Link>
    </section>
  );
};

export default HomeScreen;
