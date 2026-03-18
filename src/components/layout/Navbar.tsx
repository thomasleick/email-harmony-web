import { Sparkles } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="h-14 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-10 transition-colors">
      <div className="flex items-center gap-2.5">
        <div 
          className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-shadow" 
          style={{ boxShadow: 'var(--shadow-primary)' }}
        >
          <Sparkles className="text-primary-foreground w-4 h-4" />
        </div>
        <span className="font-semibold tracking-tight text-foreground">
          Fortress <span className="text-muted-foreground font-medium">AI</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs font-medium text-muted-foreground hidden sm:block">
          Classificação de Emails
        </span>
        <div className="h-4 w-px bg-border hidden sm:block" />
        <div className="w-8 h-8 rounded-full bg-secondary border border-border" />
      </div>
    </nav>
  );
}
