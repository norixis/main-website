import type { Metadata } from 'next';
import Link from 'next/link';
import { coerceLocale } from '@/lib/i18n';
import { getDictionary } from '@/dictionaries';
import { getFeaturedProducts, getSection, getSeoPage } from '@/lib/content';
import HeroI18n from '@/components/HeroI18n';
import ProductCardI18n from '@/components/ProductCardI18n';
import RichContent from '@/components/RichContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = coerceLocale(rawLocale);
  const seo = getSeoPage(locale, 'home');

  return {
    title: seo?.title || 'Norixis - Innovative Software & Apps',
    description:
      seo?.description ||
      'Norixis publishes cutting-edge software and applications designed to empower businesses and individuals.',
    keywords: seo?.keywords,
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = coerceLocale(rawLocale);
  const dict = getDictionary(locale);
  
  // Load content from markdown files
  const featuredProducts = getFeaturedProducts(locale);
  const aboutSection = getSection(locale, 'about');

  const capabilities = [
    {
      title: locale === 'en' ? 'Discovery and Strategy' : 'Discovery en Strategie',
      description:
        locale === 'en'
          ? 'Roadmaps focused on business outcomes, not vanity features.'
          : 'Roadmaps gericht op bedrijfsresultaten, niet op oppervlakkige features.',
    },
    {
      title: locale === 'en' ? 'Build and Launch' : 'Build en Launch',
      description:
        locale === 'en'
          ? 'Production-grade engineering, performance checks, and rollout discipline.'
          : 'Productieklare engineering, performance checks en gecontroleerde uitrol.',
    },
    {
      title: locale === 'en' ? 'Scale and Optimize' : 'Schaal en Optimaliseer',
      description:
        locale === 'en'
          ? 'Continuous iteration with analytics and feedback loops.'
          : 'Continue iteratie met analytics en feedbackloops.',
    },
  ];

  return (
    <>
      <HeroI18n dict={dict} locale={locale} />

      {/* Company Overview Section */}
      <section className="bg-white/80 py-20 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="animate-fade-in-up text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              <span className="gradient-text-purple">
                {aboutSection?.meta.title || dict.home.whoWeAre}
              </span>
            </h2>
            {aboutSection?.content ? (
              <RichContent
                source={aboutSection.content}
                className="animate-fade-in stagger-2 mx-auto mt-6 text-left text-lg leading-relaxed text-slate-600 dark:text-slate-300"
              />
            ) : (
              <p className="animate-fade-in stagger-2 mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {dict.home.whoWeAreDescription}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-indigo-50/60 via-white to-cyan-50/50 py-16 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              <span className="gradient-text-purple">
                {locale === 'en' ? 'How We Deliver' : 'Hoe Wij Leveren'}
              </span>
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
            {capabilities.map((item, idx) => (
              <div key={item.title} className={`surface-panel rounded-2xl p-6 animate-fade-in-up stagger-${Math.min(idx + 1, 3)}`}>
                <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
                  {`0${idx + 1}`}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gradient-to-br from-indigo-50/60 via-white to-cyan-50/50 py-20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="animate-fade-in-up text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              <span className="gradient-text-purple">
                {dict.home.featuredProducts}
              </span>
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.slug} 
                className={`animate-fade-in-up stagger-${index + 1}`}
              >
                <ProductCardI18n
                  title={product.meta.title}
                  description={product.description}
                  category={product.meta.category}
                  features={product.features}
                  link={product.meta.cardCtaUrl || `/${locale}/products/${product.slug}`}
                  learnMoreLabel={product.meta.cardCtaLabel || dict.home.learnMore}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-700 to-cyan-600 py-16 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-white blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-white blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl animate-fade-in-up">
              {locale === 'en' 
                ? 'Ready to transform your business?' 
                : 'Klaar om uw bedrijf te transformeren?'}
            </h2>
            <p className="animate-fade-in stagger-2 mt-4 text-lg text-indigo-100">
              {locale === 'en'
                ? 'Discover how our solutions can help you achieve your goals.'
                : 'Ontdek hoe onze oplossingen u kunnen helpen uw doelen te bereiken.'}
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6 animate-fade-in-up stagger-3">
              <Link
                href={`/${locale}/products`}
                className="btn-gradient btn-press rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg"
              >
                {dict.hero.exploreProducts}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="btn-on-gradient btn-press rounded-full px-8 py-4 text-sm font-semibold shadow-sm"
              >
                {dict.hero.contactUs}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
