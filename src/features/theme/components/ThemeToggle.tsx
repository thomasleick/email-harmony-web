'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-8 w-14 cursor-pointer items-center rounded-full bg-secondary px-1 transition-colors hover:bg-muted-foreground/10 focus:outline-none"
      aria-label="Toggle theme"
    >
      <motion.div
        className="flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-sm"
        animate={{
          x: isDarkMode ? 24 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {isDarkMode ? (
          <Moon className="h-3.5 w-3.5 text-primary-foreground" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-primary-foreground" />
        )}
      </motion.div>
    </button>
  );
}
