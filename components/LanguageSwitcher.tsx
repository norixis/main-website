'use client';

import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const getCurrentLocale = (): Locale => {
    const segments = pathname.split('/');
    const potentialLocale = segments[1];
    return locales.includes(potentialLocale as Locale) 
      ? (potentialLocale as Locale) 
      : 'en';
  };

  const switchLanguage = (newLocale: Locale) => {
    const currentLocale = getCurrentLocale();
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  const currentLocale = getCurrentLocale();
  const currentIndex = Math.max(0, locales.indexOf(currentLocale));
  const pillStep = 44;

  return (
    <div className="relative">
      <div className="relative flex gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1 shadow-sm backdrop-blur-sm transition-shadow dark:border-slate-700 dark:bg-slate-900/80">
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-1 top-1 z-0 h-9 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 shadow-md"
          animate={{ x: currentIndex * pillStep }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
        />
        {locales.map((locale) => (
          <button
            key={locale}
            type="button"
            onClick={() => switchLanguage(locale)}
            className={`relative z-10 flex h-9 w-10 items-center justify-center rounded-full text-xs font-semibold transition-all duration-200 md:text-sm ${
              currentLocale === locale
                ? 'text-white'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
            }`}
            aria-label={`Switch to ${locale === 'en' ? 'English' : 'Dutch'}`}
          >
            {locale.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
