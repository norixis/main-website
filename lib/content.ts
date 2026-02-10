import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { type Locale } from './i18n';

export interface ProductMeta {
  title: string;
  category: string;
  featured: boolean;
  order: number;
  icon: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ctaLabel?: string;
  ctaUrl?: string;
  cardCtaLabel?: string;
  cardCtaUrl?: string;
  actions?: ProductAction[];
}

export interface ProductAction {
  label: string;
  url: string;
}

export interface Product {
  slug: string;
  meta: ProductMeta;
  content: string;
  features: string[];
  description: string;
}

export interface SectionMeta {
  type: string;
  order: number;
  title?: string;
}

export interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface Section {
  slug: string;
  meta: SectionMeta;
  content: string;
}

const contentDirectory = path.join(process.cwd(), 'content');

function findLocalizedContentFile(baseDir: string, slug: string): string | null {
  for (const ext of ['.md', '.mdx']) {
    const filePath = path.join(baseDir, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  return null;
}

function extractDescription(content: string): string {
  const descriptionHeadings = ['Description', 'Beschrijving'];

  for (const heading of descriptionHeadings) {
    const descMatch = content.match(new RegExp(`##\\s+${heading}\\s+([\\s\\S]*?)(?=\\n##|$)`));
    if (descMatch?.[1]?.trim()) {
      return descMatch[1].trim();
    }
  }

  return '';
}

/**
 * Get all products for a specific locale
 */
export function getProducts(locale: Locale): Product[] {
  const productsDir = path.join(contentDirectory, 'products', locale);
  
  if (!fs.existsSync(productsDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(productsDir);
  const products = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(productsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Extract features from markdown (lines starting with - ✓)
      const features = content
        .split('\n')
        .filter((line) => line.trim().startsWith('- ✓'))
        .map((line) => line.replace('- ✓', '').trim());

      const description = extractDescription(content);

      return {
        slug,
        meta: data as ProductMeta,
        content,
        features,
        description,
      };
    })
    .sort((a, b) => (a.meta.order || 999) - (b.meta.order || 999));

  return products;
}

/**
 * Get featured products only
 */
export function getFeaturedProducts(locale: Locale): Product[] {
  return getProducts(locale).filter((product) => product.meta.featured);
}

/**
 * Get a single product by slug
 */
export function getProduct(locale: Locale, slug: string): Product | null {
  const productsDir = path.join(contentDirectory, 'products', locale);
  const productPath = findLocalizedContentFile(productsDir, slug);

  if (!productPath) {
    return null;
  }

  const fileContents = fs.readFileSync(productPath, 'utf8');
  const { data, content } = matter(fileContents);

  const features = content
    .split('\n')
    .filter((line) => line.trim().startsWith('- ✓'))
    .map((line) => line.replace('- ✓', '').trim());

  const description = extractDescription(content);

  return {
    slug,
    meta: data as ProductMeta,
    content,
    features,
    description,
  };
}

/**
 * Get all sections for a specific locale
 */
export function getSections(locale: Locale): Section[] {
  const sectionsDir = path.join(contentDirectory, 'sections', locale);
  
  if (!fs.existsSync(sectionsDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(sectionsDir);
  const sections = fileNames
    .filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(sectionsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        meta: data as SectionMeta,
        content,
      };
    })
    .sort((a, b) => (a.meta.order || 999) - (b.meta.order || 999));

  return sections;
}

/**
 * Get a single section by type
 */
export function getSection(locale: Locale, type: string): Section | null {
  const sections = getSections(locale);
  return sections.find((section) => section.meta.type === type) || null;
}

/**
 * Read page-level SEO metadata from /content/seo/{locale}/{page}.md or .mdx
 */
export function getSeoPage(locale: Locale, page: string): SeoMeta | null {
  const seoDir = path.join(contentDirectory, 'seo', locale);
  const seoPath = findLocalizedContentFile(seoDir, page);

  if (!seoPath) {
    return null;
  }

  const fileContents = fs.readFileSync(seoPath, 'utf8');
  const { data } = matter(fileContents);

  return data as SeoMeta;
}
