import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
      <p className="text-muted-foreground">The page you requested does not exist.</p>
      <Link className="text-primary underline underline-offset-4" href="/">
        Back to home
      </Link>
    </div>
  );
}
