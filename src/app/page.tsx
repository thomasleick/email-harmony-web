import { Navbar } from '@/components/layout/Navbar';
import { EmailAnalysisContainer } from '@/features/email-analysis/containers/EmailAnalysisContainer';
import { Toaster } from 'sonner';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <EmailAnalysisContainer />
      <Toaster />
    </div>
  );
}
