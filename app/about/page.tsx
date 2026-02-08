import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Norixis',
  description: 'Learn about Norixis and our mission to publish innovative software and apps.',
};

export default function About() {
  return (
    <div className="bg-white pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              About Norixis
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We&apos;re passionate about creating software that makes a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Mission</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At Norixis, we believe in the transformative power of technology. Our mission is to
              publish software and applications that empower businesses and individuals to achieve
              more. We combine cutting-edge technology with user-centric design to create solutions
              that are not just functional, but delightful to use.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Values</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Innovation</h3>
              <p className="mt-2 text-gray-600">
                We constantly push boundaries to create software that sets new standards in the
                industry.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Quality</h3>
              <p className="mt-2 text-gray-600">
                Every product we publish undergoes rigorous testing to ensure excellence in every
                detail.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">User Focus</h3>
              <p className="mt-2 text-gray-600">
                Our users are at the heart of everything we do. We build software that solves real
                problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Approach</h2>
            <p className="mt-4 text-lg text-gray-600">
              We combine technical expertise with creative thinking to deliver exceptional software
              products. Our team of experienced developers, designers, and product managers work
              collaboratively to bring innovative ideas to life.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
