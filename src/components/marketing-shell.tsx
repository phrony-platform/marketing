import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <div className="mx-auto flex w-full max-w-[1077px] flex-1 flex-col border-x border-border bg-background">
        {children}
      </div>

      <SiteFooter />
    </div>
  );
}
