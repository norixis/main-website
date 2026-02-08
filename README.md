# Norixis - Main Website

Modern Next.js website for Norixis, a company that publishes innovative software and applications.

## Features

- ✨ Built with **Next.js 14+** and **TypeScript**
- 🎨 Styled with **Tailwind CSS**
- 📱 Fully responsive design
- ♿ Accessible (WCAG compliant)
- 🚀 Optimized for performance
- 📝 SEO-friendly with proper metadata

## Project Structure

```
.
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── products/          # Products page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout with Header & Footer
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Footer component
│   ├── Hero.tsx          # Hero section
│   └── ProductCard.tsx   # Product card component
├── lib/                   # Utility functions
├── public/               # Static assets
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/norixis/main-website.git
cd main-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Tech Stack

- **Framework:** Next.js 14+
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Font:** Inter (Google Fonts)
- **Linting:** ESLint
- **Code Formatting:** Prettier

## Pages

- **Home** (`/`) - Landing page with hero section, company overview, and featured products
- **About** (`/about`) - Information about Norixis, mission, and values
- **Products** (`/products`) - Showcase of all software and applications
- **Contact** (`/contact`) - Contact form and information

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com):

```bash
npm run build
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

Copyright © 2026 Norixis. All rights reserved.
