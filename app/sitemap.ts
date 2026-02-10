import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/content';
import { locales } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://norixis.com';
  const routes = ['', '/about', '/products', '/contact'];

  const staticEntries = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
    }))
  );

  const productEntries = locales.flatMap((locale) =>
    getProducts(locale).map((product) => ({
      url: `${baseUrl}/${locale}/products/${product.slug}`,
      lastModified: new Date(),
    }))
  );

  return [...staticEntries, ...productEntries];
}
