import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Products - Norixis',
  description: 'Explore our portfolio of innovative software and applications.',
};

export default function Products() {
  const products = [
    {
      title: 'CloudSync Pro',
      description:
        'Enterprise-grade cloud synchronization solution for seamless data management across your organization.',
      category: 'Enterprise Software',
      features: [
        'Real-time synchronization',
        'End-to-end encryption',
        'Multi-platform support',
        'Advanced conflict resolution',
      ],
    },
    {
      title: 'TaskFlow',
      description:
        'Intelligent task management app designed for modern teams and workflows with AI-powered features.',
      category: 'Productivity',
      features: [
        'AI-powered scheduling',
        'Team collaboration',
        'Cross-device sync',
        'Smart notifications',
      ],
    },
    {
      title: 'DataViz Studio',
      description:
        'Transform raw data into stunning visualizations and interactive dashboards with ease.',
      category: 'Analytics',
      features: [
        'Drag-and-drop interface',
        'Custom templates',
        'Real-time updates',
        'Export to multiple formats',
      ],
    },
    {
      title: 'SecureVault',
      description:
        'Military-grade password manager and secure storage solution for individuals and teams.',
      category: 'Security',
      features: [
        'AES-256 encryption',
        'Biometric authentication',
        'Secure sharing',
        'Auto-fill capabilities',
      ],
    },
    {
      title: 'CodeReview AI',
      description:
        'Automated code review tool powered by AI to improve code quality and catch issues early.',
      category: 'Developer Tools',
      features: [
        'AI-powered analysis',
        'Multi-language support',
        'Integration with Git',
        'Custom rule engine',
      ],
    },
    {
      title: 'MeetingMaster',
      description:
        'Streamline your meetings with automated transcription, action items, and follow-ups.',
      category: 'Productivity',
      features: [
        'Real-time transcription',
        'Automatic summaries',
        'Action item tracking',
        'Calendar integration',
      ],
    },
  ];

  return (
    <div className="bg-white pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Our Products
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover our comprehensive portfolio of software and applications designed to solve
              real-world challenges and drive innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We&apos;re constantly developing new products. Contact us to learn about upcoming
              releases or discuss custom solutions.
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
