import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
