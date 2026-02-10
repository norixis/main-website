'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ProductCardI18n from '@/components/ProductCardI18n';

interface ProductGridItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  ctaLabel?: string;
  ctaUrl?: string;
}

interface ProductsFilterGridProps {
  locale: string;
  categories: string[];
  products: ProductGridItem[];
  learnMoreLabel: string;
}

export default function ProductsFilterGrid({
  locale,
  categories,
  products,
  learnMoreLabel,
}: ProductsFilterGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedRaw = searchParams.get('category') ?? 'all';
  const selectedCategory = selectedRaw === 'all' || categories.includes(selectedRaw) ? selectedRaw : 'all';
  const isEnglish = locale === 'en';
  const filterItems = ['all', ...categories];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const onCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <div className="space-y-8">
      <div className="surface-panel mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl p-5 md:flex-row md:justify-between">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {isEnglish ? 'Filter by category' : 'Filter op categorie'}
        </p>
        <div className="flex w-full flex-wrap items-center justify-end gap-2 md:w-auto">
          {filterItems.map((item, index) => {
            const isActive = selectedCategory === item;
            const label = item === 'all' ? (isEnglish ? 'All categories' : 'Alle categorieën') : item;
            const idSlug = item.toLowerCase().replace(/\s+/g, '-');

            return (
              <motion.button
                key={item}
                type="button"
                data-testid={`products-category-chip-${idSlug}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.2) }}
                onClick={() => onCategoryChange(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'btn-gradient text-white shadow-md'
                    : 'border border-indigo-100/90 bg-white text-slate-700 hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-300'
                }`}
                aria-pressed={isActive}
              >
                {label}
              </motion.button>
            );
          })}
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {filteredProducts.length} {isEnglish ? 'results' : 'resultaten'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, index) => (
          <div key={product.slug} className={`animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}>
            <ProductCardI18n
              title={product.title}
              description={product.description}
              category={product.category}
              features={product.features}
              link={product.ctaUrl || `/${locale}/products/${product.slug}`}
              learnMoreLabel={product.ctaLabel || learnMoreLabel}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
