import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailView from '@/components/ProductDetailView';
import { getProduct, getProducts } from '@/lib/content';
import { coerceLocale, locales } from '@/lib/i18n';

interface ProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getProducts(locale).map((product) => ({
      locale,
      slug: product.slug,
    }))
  );
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = coerceLocale(rawLocale);
  const product = getProduct(locale, slug);

  if (!product) {
    return {
      title: 'Product Not Found - Norixis',
    };
  }

  return {
    title: product.meta.seoTitle || `${product.meta.title} - Norixis`,
    description: product.meta.seoDescription || product.description,
    keywords: product.meta.seoKeywords,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = coerceLocale(rawLocale);
  const product = getProduct(locale, slug);

  if (!product) {
    notFound();
  }

  const contentWithoutTopHeading = product.content.replace(/^\s*#\s.+\n+/, '');

  return <ProductDetailView product={product} locale={locale} contentSource={contentWithoutTopHeading} />;
}
