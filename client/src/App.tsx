import './App.css';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

function App() {
  return (
    <>
      <header className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Coming Soon
          </h1>
          <p className="mt-4 text-muted-foreground">
            Get ready for the launch of our exciting new product. Sign up below
            to stay informed and be the first to know when it's available.
          </p>
          <form className="mt-6 flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button type="submit">Notify Me</Button>
          </form>
        </div>
      </header>
    </>
  );
}

export default App;
