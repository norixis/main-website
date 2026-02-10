import type { Metadata } from 'next';
import { coerceLocale } from '@/lib/i18n';
import { getDictionary } from '@/dictionaries';
import { getSeoPage } from '@/lib/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = coerceLocale(rawLocale);
  const seo = getSeoPage(locale, 'about');
  
  return {
    title: seo?.title || (locale === 'en' ? 'About Us - Norixis' : 'Over Ons - Norixis'),
    description:
      seo?.description ||
      (locale === 'en'
        ? 'Learn about Norixis and our mission to publish innovative software and apps.'
        : 'Leer meer over Norixis en onze missie om innovatieve software en apps te publiceren.'),
    keywords: seo?.keywords,
  };
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = coerceLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <div className="bg-white/80 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative flex min-h-[48vh] items-center overflow-hidden bg-gradient-to-br from-indigo-100/70 via-white to-cyan-50 py-20 md:min-h-[56vh] dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/80">
        <div className="absolute inset-0">
          <div className="animate-float absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-300/25 blur-3xl"></div>
          <div className="animate-float absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-300/25 blur-3xl" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="gradient-text-purple">
                {dict.about.title}
              </span>
            </h1>
            <p className="animate-fade-in-up stagger-2 mt-6 text-xl leading-8 text-slate-700 dark:text-slate-300">
              {dict.about.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight animate-slide-in-left">
              <span className="gradient-text-purple">
                {dict.about.mission}
              </span>
            </h2>
            <p className="animate-fade-in-up stagger-2 mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {dict.about.missionDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-br from-indigo-50/50 to-white py-20 dark:from-slate-900 dark:to-slate-800/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight animate-fade-in-up">
              <span className="gradient-text-purple">
                {dict.about.values}
              </span>
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            <div className="surface-panel card-hover animate-fade-in-up stagger-2 rounded-2xl p-8 hover-glow">
              <div className="gradient-purple flex h-14 w-14 items-center justify-center rounded-xl shadow-lg hover-grow">
                <svg
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-slate-100">{dict.about.innovationTitle}</h3>
              <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
                {dict.about.innovationDescription}
              </p>
            </div>

            <div className="surface-panel card-hover animate-fade-in-up stagger-3 rounded-2xl p-8 hover-glow">
              <div className="gradient-purple flex h-14 w-14 items-center justify-center rounded-xl shadow-lg hover-grow">
                <svg
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-slate-100">{dict.about.qualityTitle}</h3>
              <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
                {dict.about.qualityDescription}
              </p>
            </div>

            <div className="surface-panel card-hover animate-fade-in-up stagger-4 rounded-2xl p-8 hover-glow">
              <div className="gradient-purple flex h-14 w-14 items-center justify-center rounded-xl shadow-lg hover-grow">
                <svg
                  className="h-7 w-7 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-slate-100">{dict.about.customerFocusTitle}</h3>
              <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
                {dict.about.customerFocusDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight animate-fade-in-up">
              <span className="gradient-text-purple">
                {dict.about.team}
              </span>
            </h2>
            <p className="animate-fade-in stagger-2 mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {dict.about.teamDescription}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
