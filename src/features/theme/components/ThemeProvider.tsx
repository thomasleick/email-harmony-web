'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '../store/useThemeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [mounted, setMounted] = useState(false);

  // Evitar hidratação mismatch (Zustand persist + SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode, mounted]);

  if (!mounted) {
    return <div className="invisible">{children}</div>;
  }

  return <>{children}</>;
}
