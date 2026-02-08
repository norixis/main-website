import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Innovative Software & Apps That
            <span className="text-blue-600"> Transform Ideas</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Norixis publishes cutting-edge software and applications designed to empower
            businesses and individuals. We transform complex challenges into elegant solutions.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/products"
              className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
