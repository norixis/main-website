import type { Metadata } from 'next';
import ContactFormClient from '@/components/ContactFormClient';
import { getDictionary } from '@/dictionaries';
import { getSeoPage } from '@/lib/content';
import { COMPANY } from '@/lib/company';
import { coerceLocale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = coerceLocale(rawLocale);
  const seo = getSeoPage(locale, 'contact');
  const isEnglish = locale === 'en';

  return {
    title: seo?.title || (isEnglish ? 'Contact - Norixis' : 'Contact - Norixis'),
    description:
      seo?.description ||
      (isEnglish
        ? "Have a question? Contact Norixis to learn more about our software products."
        : 'Heeft u een vraag? Neem contact op met Norixis voor meer informatie over onze software.'),
    keywords: seo?.keywords,
  };
}

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = coerceLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <div className="bg-white/80 dark:bg-slate-950">
      <section className="relative flex min-h-[48vh] items-center overflow-hidden bg-gradient-to-br from-indigo-100/70 via-white to-cyan-50 py-20 md:min-h-[56vh] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/80">
        <div className="absolute inset-0">
          <div className="animate-float absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-300/25 blur-3xl"></div>
          <div
            className="animate-float absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-300/25 blur-3xl"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="gradient-text-purple">{dict.contact.title}</span>
            </h1>
            <p className="animate-fade-in-up stagger-2 mt-6 text-xl leading-8 text-slate-700 dark:text-slate-300">
              {dict.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="animate-slide-in-left">
              <h2 className="text-2xl font-bold">
                <span className="gradient-text-purple">{dict.contact.contactInformation}</span>
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">{dict.contact.contactDescription}</p>

              <div className="mt-8 space-y-6">
                <div className="group animate-fade-in-up stagger-2 flex items-start">
                  <div className="gradient-purple hover-grow flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl shadow-lg transition-all group-hover:shadow-xl">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {locale === 'en' ? 'Founder' : 'Oprichter'}
                    </h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">N. Molavi</p>
                  </div>
                </div>

                <div className="group animate-fade-in-up stagger-2 flex items-start">
                  <div className="gradient-purple hover-grow flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl shadow-lg transition-all group-hover:shadow-xl">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{dict.contact.email}</h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">info@norixis.com</p>
                  </div>
                </div>

                <div className="group animate-fade-in-up stagger-3 flex items-start">
                  <div className="gradient-purple hover-grow flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl shadow-lg transition-all group-hover:shadow-xl">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {dict.contact.businessHours}
                    </h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">{dict.contact.businessHoursValue}</p>
                  </div>
                </div>

                <div className="group animate-fade-in-up stagger-4 flex items-start">
                  <div className="gradient-purple hover-grow flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl shadow-lg transition-all group-hover:shadow-xl">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {dict.contact.location}
                    </h3>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">{dict.contact.locationValue}</p>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">KVK: {COMPANY.kvk}</p>
                  </div>
                </div>
              </div>
            </div>

            <ContactFormClient dict={dict} locale={locale} />
          </div>
        </div>
      </section>
    </div>
  );
}
