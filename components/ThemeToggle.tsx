'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

type Mode = 'system' | 'light' | 'dark';
const MODES: Mode[] = ['system', 'light', 'dark'];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const current = mounted ? ((theme ?? 'system') as Mode) : 'system';
  const currentIndex = Math.max(0, MODES.indexOf(current));

  const renderIcon = (mode: Mode) => {
    if (mode === 'system') {
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
        </svg>
      );
    }
    if (mode === 'light') {
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      );
    }
    return (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.742 13.045A8.088 8.088 0 0 1 19 13.23a8.25 8.25 0 0 1-8.23-8.23c0-.6.063-1.184.184-1.742A9 9 0 1 0 20.742 13.045Z" />
      </svg>
    );
  };

  if (!mounted) {
    return (
      <div className="relative flex gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1 shadow-sm backdrop-blur-sm transition-shadow dark:border-slate-700 dark:bg-slate-900/80">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1 top-1 z-0 h-9 w-9 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 shadow-md"
        />
        {MODES.map((mode) => (
          <button
            key={mode}
            type="button"
            className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-250 ${
              current === mode
                ? 'text-white'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
            }`}
            aria-label={`Switch to ${mode} mode`}
            data-testid={`theme-${mode}`}
          >
            <span className="flex items-center justify-center">{renderIcon(mode)}</span>
            <span className="sr-only capitalize">{mode}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative flex gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1 shadow-sm backdrop-blur-sm transition-shadow dark:border-slate-700 dark:bg-slate-900/80"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-1 top-1 z-0 h-9 w-9 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 shadow-md"
        animate={{ x: currentIndex * 40 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      />
      {MODES.map((mode) => (
        <motion.button
          key={mode}
          type="button"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, delay: MODES.indexOf(mode) * 0.05, ease: 'easeOut' }}
          onClick={() => setTheme(mode)}
          className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-250 ${
            current === mode
              ? 'text-white'
              : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
          }`}
          aria-label={`Switch to ${mode} mode`}
          data-testid={`theme-${mode}`}
        >
          <motion.span
            initial={false}
            animate={{
              rotate: current === mode ? 0 : mode === 'dark' ? -14 : mode === 'light' ? 14 : 0,
              scale: current === mode ? 1.08 : 1,
              opacity: current === mode ? 1 : 0.92,
            }}
            transition={{ type: 'spring', stiffness: 360, damping: 22 }}
            className="flex items-center justify-center"
          >
            {renderIcon(mode)}
          </motion.span>
          <span className="sr-only capitalize">{mode}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
