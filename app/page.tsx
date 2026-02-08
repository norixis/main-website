import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const featuredProducts = [
    {
      title: 'CloudSync Pro',
      description: 'Enterprise-grade cloud synchronization solution for seamless data management.',
      category: 'Enterprise Software',
      features: [
        'Real-time synchronization',
        'End-to-end encryption',
        'Multi-platform support',
      ],
    },
    {
      title: 'TaskFlow',
      description: 'Intelligent task management app designed for modern teams and workflows.',
      category: 'Productivity',
      features: ['AI-powered scheduling', 'Team collaboration', 'Cross-device sync'],
    },
    {
      title: 'DataViz Studio',
      description: 'Transform raw data into stunning visualizations and interactive dashboards.',
      category: 'Analytics',
      features: ['Drag-and-drop interface', 'Custom templates', 'Real-time updates'],
    },
  ];

  return (
    <>
      <Hero />

      {/* Company Overview Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Who We Are
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Norixis is a leading software publisher committed to creating innovative solutions
              that drive business success. Our portfolio of applications spans enterprise software,
              productivity tools, and specialized apps designed to solve real-world challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover our flagship software and apps trusted by thousands of users worldwide.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of satisfied customers who trust Norixis for their software needs.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <a
                href="/products"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
              >
                View All Products
              </a>
              <a
                href="/contact"
                className="text-sm font-semibold leading-6 text-gray-900 transition-colors hover:text-blue-600"
              >
                Contact Sales <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
