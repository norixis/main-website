# Content Management Guide

## Overview

This project uses a file-based content management system with Markdown files. All content is stored in the `content/` directory, making it easy to add, edit, or remove content without touching the codebase.

## Directory Structure

```
content/
├── products/
│   ├── en/           # English product files
│   │   ├── cloudsync-pro.md
│   │   ├── taskflow.md
│   │   └── dataviz-studio.md
│   └── nl/           # Dutch product files
│       ├── cloudsync-pro.md
│       ├── taskflow.md
│       └── dataviz-studio.md
└── sections/
    ├── en/           # English section files
    │   ├── hero.md
    │   └── about.md
    └── nl/           # Dutch section files
        ├── hero.md
        └── about.md
```

## Adding Products

### 1. Create a Product File

Create a new `.md` file in `content/products/en/` (and corresponding file in `nl/`):

**File:** `content/products/en/my-new-product.md`

```markdown
---
title: My New Product
category: Software Category
featured: true
order: 4
icon: sparkles
---

# My New Product

Short description of your product that appears in the card.

## Key Features

- ✓ Feature one
- ✓ Feature two
- ✓ Feature three
- ✓ Feature four

## Description

Detailed description of your product. This will be shown on the product card and detail pages.
```

### 2. Frontmatter Fields

- **title**: Product name (required)
- **category**: Product category label (required)
- **featured**: Set to `true` to show on homepage, `false` to show only on products page
- **order**: Display order (1, 2, 3, etc.) - lower numbers appear first
- **icon**: Icon identifier for future use (optional)

### 3. Content Sections

- **Title (# heading)**: Main product title
- **Key Features (## Key Features)**: Bullet list starting with `- ✓`
- **Description (## Description)**: Detailed product description

## Adding Sections

### Hero Section

**File:** `content/sections/en/hero.md`

```markdown
---
type: hero
order: 1
---

# Your Hero Headline Here

Your hero description text that appears below the headline.
```

### About Section

**File:** `content/sections/en/about.md`

```markdown
---
type: about
order: 2
title: Section Title
---

Your about content goes here. This will be displayed in the about section on the homepage.
```

## Multilingual Content

Always create both English and Dutch versions:

1. English: `content/products/en/filename.md` or `content/sections/en/filename.md`
2. Dutch: `content/products/nl/filename.md` or `content/sections/nl/filename.md`

The filename should be the same in both languages (e.g., `cloudsync-pro.md`), but the content inside should be translated.

## Content Guidelines

### Products

- **Title**: Keep it concise and memorable
- **Category**: Use clear category names (e.g., "Enterprise Software", "Productivity", "Analytics")
- **Description**: 2-3 sentences explaining what the product does
- **Features**: 3-5 key features, each on its own line starting with `- ✓`

### Best Practices

1. **Consistency**: Use consistent terminology across all content
2. **Brevity**: Keep descriptions concise for better UI presentation
3. **Features**: Focus on benefits, not just technical specifications
4. **Translation**: Ensure translations maintain the same meaning and tone
5. **Order**: Use the `order` field to control display sequence

## How It Works

The content management system:

1. Reads all `.md` files from the content directories
2. Parses frontmatter (metadata between `---` markers)
3. Extracts features (lines starting with `- ✓`)
4. Extracts descriptions (content after `## Description`)
5. Sorts by `order` field
6. Filters by `featured` flag for homepage display

## Adding More Content Types

To add new content types:

1. Create a new directory in `content/`
2. Add corresponding loader functions in `lib/content.ts`
3. Update components to use the new content type

## File Naming

- Use kebab-case: `my-product-name.md`
- Keep names URL-friendly (lowercase, hyphens only)
- The filename becomes the slug for routing

## Quick Reference

### Product Template

```markdown
---
title: Product Name
category: Category
featured: true
order: 1
icon: icon-name
---

# Product Name

Brief description here.

## Key Features

- ✓ Feature 1
- ✓ Feature 2
- ✓ Feature 3

## Description

Detailed description here.
```

### Section Template

```markdown
---
type: section-type
order: 1
title: Optional Title
---

Your content here.
```

## Need Help?

- Check existing files for examples
- Ensure frontmatter syntax is correct (proper YAML format)
- Verify all required fields are present
- Test in both English and Dutch
