'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Dictionary } from '@/dictionaries';

interface HeroProps {
  dict: Dictionary;
  locale: string;
}

export default function Hero({ dict, locale }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-cyan-50/60 pb-20 pt-10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/80 md:pt-14">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-indigo-300/30 blur-3xl"
          animate={{ y: [0, -16, 0], opacity: [0.3, 0.45, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl"
          animate={{ y: [0, -22, 0], opacity: [0.28, 0.45, 0.28] }}
          transition={{ duration: 8.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl lg:text-7xl"
          >
            {dict.hero.title}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.65, ease: 'easeOut' }}
              className="gradient-text-purple mt-2 block"
            >
              {dict.hero.titleHighlight}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl"
          >
            {dict.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: 'easeOut' }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
          >
            <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={`/${locale}/products`}
                className="btn-gradient btn-press rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {dict.hero.exploreProducts}
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={`/${locale}/contact`}
                className="btn-gradient-outline btn-press rounded-full px-8 py-4 text-sm font-semibold shadow-sm"
              >
                {dict.hero.contactUs}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
