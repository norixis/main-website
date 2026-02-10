import Link from 'next/link';
import type { Dictionary } from '@/dictionaries';
import { COMPANY } from '@/lib/company';

interface FooterProps {
  dict: Dictionary;
  locale: string;
}

export default function Footer({ dict, locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-indigo-100/80 bg-gradient-to-br from-indigo-50/60 via-white to-cyan-50/50 dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/80">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="gradient-text-purple text-lg font-bold">
              Norixis
            </h3>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              {dict.footer.tagline}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">KVK: {COMPANY.kvk}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              {dict.footer.quickLinks}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-sm text-slate-600 transition-colors duration-200 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300"
                >
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-sm text-slate-600 transition-colors duration-200 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300"
                >
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/products`}
                  className="text-sm text-slate-600 transition-colors duration-200 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300"
                >
                  {dict.nav.products}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-sm text-slate-600 transition-colors duration-200 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300"
                >
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              {dict.footer.connect}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 transition-colors duration-200 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 transition-colors duration-200 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 transition-colors duration-200 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-indigo-100/80 pt-8 text-center dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            &copy; {currentYear} Norixis. {dict.footer.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
