import type { Metadata } from 'next';
import { coerceLocale, locales } from '@/lib/i18n';
import { getDictionary } from '@/dictionaries';
import HeaderI18n from '@/components/HeaderI18n';
import FooterI18n from '@/components/FooterI18n';
import ThemeProvider from '@/components/ThemeProvider';
import ScrollToTop from '@/components/ScrollToTop';
import AppToaster from '@/components/AppToaster';
import '../globals.css';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = coerceLocale(rawLocale);
  const isEnglish = locale === 'en';
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://norixis.com'),
    title: isEnglish 
      ? 'Norixis - Innovative Software & Apps' 
      : 'Norixis - Innovatieve Software & Apps',
    description: isEnglish
      ? 'Norixis publishes cutting-edge software and applications designed to empower businesses and individuals.'
      : 'Norixis publiceert geavanceerde software en applicaties ontworpen om bedrijven en individuen te versterken.',
    keywords: ['software', 'apps', 'technology', 'innovation', 'Norixis'],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = coerceLocale(rawLocale);
  const dict = getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <ScrollToTop />
          <HeaderI18n dict={dict} locale={locale} />
          <main className="min-h-screen pt-[76px]">{children}</main>
          <FooterI18n dict={dict} locale={locale} />
          <AppToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
