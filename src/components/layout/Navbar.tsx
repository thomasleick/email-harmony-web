import { Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/features/theme/components/ThemeToggle';

export function Navbar() {
  return (
    <nav className="h-14 border-b border-border/50 bg-card/70 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-10 transition-colors">
      <div className="flex items-center gap-2.5">
        <div 
          className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-shadow" 
          style={{ boxShadow: 'var(--shadow-primary)' }}
        >
          <Sparkles className="text-primary-foreground w-4 h-4" />
        </div>
        <span className="font-semibold tracking-tight text-foreground">
          Fortress <span className="text-muted-foreground font-medium border-l border-border/50 ml-1.5 pl-2">AI</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-4 border-r border-border/50 pr-4">
          <span className="text-xs font-medium text-muted-foreground">
            Classificação de Emails
          </span>
          <ThemeToggle />
        </div>
        <div className="sm:hidden">
          <ThemeToggle />
        </div>
        <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        </div>
      </div>
    </nav>
  );
}
