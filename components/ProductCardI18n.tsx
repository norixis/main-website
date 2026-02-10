'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardProps {
  title: string;
  description: string;
  category: string;
  features?: string[];
  link: string;
  learnMoreLabel?: string;
}

export default function ProductCard({
  title,
  description,
  category,
  features = [],
  link,
  learnMoreLabel = 'Learn more',
}: ProductCardProps) {
  return (
    <Link
      href={link}
      aria-label={`${learnMoreLabel}: ${title}`}
      className="group relative block rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500"
    >
      <motion.div
        whileHover={{ y: -7 }}
        transition={{ type: 'spring', stiffness: 240, damping: 19 }}
        className="card-hover hover-glow surface-panel relative overflow-hidden rounded-2xl p-8"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/70 to-cyan-50/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-slate-800/80 dark:to-slate-900/10"></div>

        <div className="relative z-10">
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-100 to-cyan-100 px-4 py-1.5 text-xs font-semibold text-indigo-800 dark:from-slate-800 dark:to-slate-700 dark:text-indigo-200">
              {category}
            </span>
          </div>

          <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-700 dark:text-slate-100 dark:group-hover:text-indigo-300">
            {title}
          </h3>

          <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>

          {features.length > 0 && (
            <ul className="mb-6 space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="group/item flex items-start text-sm text-slate-600 dark:text-slate-300">
                  <svg
                    className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-600 transition-transform duration-300 group-hover/item:scale-110 dark:text-indigo-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <div className="group/link inline-flex items-center text-sm font-semibold text-indigo-600 transition-all duration-200 group-hover:text-indigo-700 dark:text-indigo-300 dark:group-hover:text-indigo-200">
            {learnMoreLabel}
            <svg
              className="ml-1 h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
