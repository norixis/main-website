import Link from 'next/link';

interface ProductCardProps {
  title: string;
  description: string;
  category: string;
  features?: string[];
  link?: string;
}

export default function ProductCard({
  title,
  description,
  category,
  features = [],
  link = '#',
}: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
          {category}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>

      {/* Description */}
      <p className="mb-4 text-sm text-gray-600">{description}</p>

      {/* Features */}
      {features.length > 0 && (
        <ul className="mb-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm text-gray-600">
              <svg
                className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {/* Learn More Link */}
      <Link
        href={link}
        className="inline-flex items-center text-sm font-semibold text-blue-600 transition-colors hover:text-blue-500"
      >
        Learn more
        <svg
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </div>
  );
}
