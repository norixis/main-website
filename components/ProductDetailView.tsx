import Link from 'next/link';
import RichContent from '@/components/RichContent';
import type { Product } from '@/lib/content';

interface ProductDetailViewProps {
  product: Product;
  locale: string;
  contentSource: string;
}

export default function ProductDetailView({ product, locale, contentSource }: ProductDetailViewProps) {
  const defaultCtaLabel = locale === 'en' ? 'Request a demo' : 'Vraag een demo aan';
  const actionLinks =
    product.meta.actions && product.meta.actions.length > 0
      ? product.meta.actions
      : product.meta.ctaUrl
        ? [{ label: product.meta.ctaLabel || defaultCtaLabel, url: product.meta.ctaUrl }]
        : [{ label: defaultCtaLabel, url: `/${locale}/contact` }];
  const primaryAction = actionLinks[0];
  const secondaryAction =
    actionLinks[1] || { label: locale === 'en' ? 'Contact us' : 'Neem contact op', url: `/${locale}/contact` };

  const isExternalUrl = (url: string) => /^https?:\/\//i.test(url);
  const normalizeInternalUrl = (url: string) => {
    if (!url.startsWith('/')) {
      return url;
    }
    return url.startsWith(`/${locale}/`) ? url : `/${locale}${url}`;
  };
  const resolveHref = (url: string) => (isExternalUrl(url) ? url : normalizeInternalUrl(url));
  const isStoreAction = (label: string) => {
    const normalized = label.toLowerCase();
    return (
      normalized.includes('app store') ||
      normalized.includes('google play') ||
      normalized.includes('ios') ||
      normalized.includes('android')
    );
  };
  const primaryActionHref = resolveHref(primaryAction.url);
  const secondaryActionHref = resolveHref(secondaryAction.url);

  return (
    <div className="bg-white/80 dark:bg-slate-950">
      <section className="relative flex min-h-[42vh] items-center overflow-hidden bg-gradient-to-br from-indigo-100/70 via-white to-cyan-50 py-20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/80">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-float absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-300/25 blur-3xl" />
          <div
            className="animate-float absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-300/25 blur-3xl"
            style={{ animationDelay: '0.5s' }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center text-sm font-semibold text-indigo-700 transition-colors hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-200"
          >
            ← {locale === 'en' ? 'Back to products' : 'Terug naar producten'}
          </Link>
          <p className="animate-fade-in-up mt-8 text-sm font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
            {product.meta.category}
          </p>
          <h1 className="animate-fade-in-up stagger-2 mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            {product.meta.title}
          </h1>
          <p className="animate-fade-in-up stagger-3 mt-6 max-w-4xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            {product.description}
          </p>

          {product.features.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {product.features.map((feature, idx) => (
                <div
                  key={feature}
                  className={`animate-fade-in-up rounded-xl border border-indigo-100 bg-white/75 p-3 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 stagger-${Math.min(idx + 1, 6)}`}
                >
                  {feature}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
          <div className="animate-fade-in-up surface-panel rounded-2xl p-7">
            <RichContent source={contentSource} className="text-slate-700 dark:text-slate-300" />
          </div>

          <aside className="animate-fade-in-up stagger-2 surface-panel h-fit rounded-2xl p-6 lg:sticky lg:top-24">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {locale === 'en' ? 'Product Snapshot' : 'Productoverzicht'}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-center justify-between">
                <span>{locale === 'en' ? 'Category' : 'Categorie'}</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{product.meta.category}</span>
              </li>
              <li className="flex items-center justify-between">
                <span>{locale === 'en' ? 'Feature Count' : 'Aantal kenmerken'}</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{product.features.length}</span>
              </li>
            </ul>
            <div className="mt-6">
              <div className="space-y-3">
                {actionLinks.map((action, index) => {
                  const href = resolveHref(action.url);
                  const external = isExternalUrl(action.url);
                  const storeStyle = isStoreAction(action.label);
                  return (
                    <Link
                      key={`${action.label}-${action.url}-${index}`}
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className={
                        storeStyle
                          ? 'inline-flex w-full items-center gap-3 rounded-xl bg-slate-950 px-4 py-3 text-white shadow-lg shadow-slate-900/25 transition hover:-translate-y-0.5 hover:bg-black dark:bg-white dark:text-slate-900 dark:shadow-black/30 dark:hover:bg-slate-100'
                          : index === 0
                            ? 'btn-gradient inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white'
                            : 'btn-gradient-outline inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold'
                      }
                    >
                      {storeStyle ? (
                        <>
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 text-[10px] font-bold uppercase tracking-wide dark:bg-slate-900/10">
                            iOS
                          </span>
                          <span className="flex flex-col text-left leading-tight">
                            <span className="text-[10px] font-medium uppercase tracking-wide opacity-80">
                              {locale === 'en' ? 'Download on the' : 'Download op de'}
                            </span>
                            <span className="text-base font-semibold">{action.label}</span>
                          </span>
                        </>
                      ) : (
                        action.label
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-cyan-600 p-8 text-white shadow-2xl shadow-indigo-900/20 sm:p-10">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-cyan-200/20 blur-3xl" />
            </div>
            <div className="relative flex flex-col gap-5 sm:gap-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">
                {locale === 'en' ? 'Ready to Play?' : 'Klaar om te spelen?'}
              </p>
              <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
                {locale === 'en'
                  ? 'Start your Block Nova run and push your score to the top.'
                  : 'Start je Block Nova run en duw je score naar de top.'}
              </h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={primaryActionHref}
                  target={isExternalUrl(primaryAction.url) ? '_blank' : undefined}
                  rel={isExternalUrl(primaryAction.url) ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-bold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-50"
                >
                  {primaryAction.label}
                </Link>
                <Link
                  href={secondaryActionHref}
                  target={isExternalUrl(secondaryAction.url) ? '_blank' : undefined}
                  rel={isExternalUrl(secondaryAction.url) ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center justify-center rounded-xl border border-white/55 bg-white/10 px-6 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  {secondaryAction.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
