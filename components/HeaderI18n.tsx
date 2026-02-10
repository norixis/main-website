'use client';

import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import type { Dictionary } from '@/dictionaries';

interface HeaderProps {
  dict: Dictionary;
  locale: string;
}

export default function Header({ dict, locale }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/products`, label: dict.nav.products },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <header className="fixed top-0 z-50 h-[76px] w-full border-b border-indigo-100/80 bg-white/90 backdrop-blur-xl shadow-[0_10px_28px_-22px_rgba(15,23,42,0.55)] dark:border-slate-700 dark:bg-slate-950/85">
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href={`/${locale}`} className="group py-1">
            <span className="gradient-text-purple inline-block text-2xl font-bold transition-transform duration-200 group-hover:scale-[1.02]">
              Norixis
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="animate-fade-in group relative text-sm font-semibold text-slate-700 transition-colors duration-200 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-indigo-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3 lg:flex-1 lg:justify-end">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <div className="animate-fade-in stagger-4">
            <LanguageSwitcher />
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 transition-all duration-200 hover:bg-indigo-50 dark:text-slate-200 dark:hover:bg-slate-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="animate-fade-in-down border-t border-indigo-100 bg-white/90 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/90 lg:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            <div className="pb-2 md:hidden">
              <ThemeToggle />
            </div>
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="animate-fade-in-up block rounded-lg px-3 py-2 text-base font-semibold text-slate-900 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
