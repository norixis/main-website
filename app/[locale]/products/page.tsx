import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { coerceLocale } from '@/lib/i18n';
import { getDictionary } from '@/dictionaries';
import { getProducts, getSeoPage } from '@/lib/content';
import ProductsFilterGrid from '@/components/ProductsFilterGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = coerceLocale(rawLocale);
  const seo = getSeoPage(locale, 'products');
  
  return {
    title: seo?.title || (locale === 'en' ? 'Products - Norixis' : 'Producten - Norixis'),
    description:
      seo?.description ||
      (locale === 'en'
        ? 'Explore our portfolio of innovative software and applications.'
        : 'Ontdek ons portfolio van innovatieve software en applicaties.'),
    keywords: seo?.keywords,
  };
}

export default async function Products({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = coerceLocale(rawLocale);
  const dict = getDictionary(locale);
  const products = getProducts(locale);
  const categories = Array.from(new Set(products.map((product) => product.meta.category)));
  const productCards = products.map((product) => ({
    slug: product.slug,
    title: product.meta.title,
    description: product.description,
    category: product.meta.category,
    features: product.features,
    ctaLabel: product.meta.cardCtaLabel,
    ctaUrl: product.meta.cardCtaUrl,
  }));

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
                {dict.products.title}
              </span>
            </h1>
            <p className="animate-fade-in-up stagger-2 mt-6 text-xl leading-8 text-slate-700 dark:text-slate-300">
              {dict.products.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {productCards.map((product, index) => (
                  <div key={product.slug} className={`animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}>
                    <div className="surface-panel rounded-2xl p-8">
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-300">
                        {product.category}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                        {product.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            <ProductsFilterGrid
              locale={locale}
              categories={categories}
              products={productCards}
              learnMoreLabel={dict.home.learnMore}
            />
          </Suspense>
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
                ? 'Interested in our products?' 
                : 'Geïnteresseerd in onze producten?'}
            </h2>
            <p className="animate-fade-in stagger-2 mt-4 text-lg text-indigo-100">
              {locale === 'en'
                ? 'Get in touch to learn more about how we can help your business.'
                : 'Neem contact op om meer te weten te komen over hoe we uw bedrijf kunnen helpen.'}
            </p>
            <div className="mt-8 animate-fade-in-up stagger-3">
              <Link
                href={`/${locale}/contact`}
                className="btn-gradient btn-press inline-block rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg"
              >
                {dict.hero.contactUs}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
