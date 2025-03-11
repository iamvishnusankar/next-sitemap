[Documentation](https://github.com/iamvishnusankar/next-sitemap)

## LLMs.txt

The `/llms.txt` file is a proposed standard to help large language models (LLMs) better understand websites and their content. It uses Markdown format to provide key information and links to relevant pages.

### Static Generation

To generate an `llms.txt` file, add the following to your `next-sitemap.config.js`:

```js
module.exports = {
  siteUrl: 'https://example.com',
  generateRobotsTxt: true,
  generateLLMsTxt: true, // Enable llms.txt generation
  llmsTxtOptions: {
    title: 'My Website',  // Required: H1 title
    description: 'A Next.js website with blog posts and documentation about web development.', // Recommended: Summary
    details: `
This site contains articles about:
- JavaScript and TypeScript
- React and Next.js
- Web performance optimization
- SEO best practices
    `, // Optional: Additional details
    sections: [
      {
        title: 'Documentation',
        links: [
          {
            title: 'Getting Started',
            url: 'https://example.com/docs/getting-started',
            details: 'Guide for beginners'
          },
          {
            title: 'API Reference',
            url: 'https://example.com/docs/api',
            details: 'Complete API documentation'
          }
        ]
      },
      {
        title: 'Examples',
        isOptional: true, // Mark as optional section
        links: [
          {
            title: 'Basic Example',
            url: 'https://example.com/examples/basic'
          },
          {
            title: 'Advanced Example',
            url: 'https://example.com/examples/advanced',
            details: 'For experienced users'
          }
        ]
      }
    ],
    // Optional: Custom transformer to modify the generated content
    transformLLMsTxt: async (config, llmsTxt) => {
      // Add custom content or modify the generated content
      return llmsTxt + '\n\n## Contact\n\n- Email: contact@example.com\n';
    }
  }
}
```

### Server-Side Rendering (SSR)

You can also generate the llms.txt file dynamically on the server side.

#### Next.js Pages Directory

For the Pages directory, create a page at `pages/llms.txt.js`:

```jsx
// pages/llms.txt.js
import { getServerSideLLMsTxtLegacy } from 'next-sitemap'

export const getServerSideProps = async (ctx) => {
  // Configuration
  const config = {
    siteUrl: 'https://example.com',
    llmsTxtOptions: {
      title: 'My Website',
      description: 'A Next.js website with blog posts and documentation about web development.',
      // Add sections and other options as needed
    }
  }

  // Generate and return the llms.txt content
  return getServerSideLLMsTxtLegacy(ctx, config)
}

// This default export is required
export default function Llms() {
  return null
}
```

#### Next.js App Router

For the App Router, create a route at `app/llms.txt/route.js`:

```jsx
// app/llms.txt/route.js
import { getServerSideLLMsTxt } from 'next-sitemap'

export async function GET() {
  // Configuration
  const config = {
    siteUrl: 'https://example.com',
    llmsTxtOptions: {
      title: 'My Website',
      description: 'A Next.js website with blog posts and documentation about web development.',
      // Add sections and other options as needed
    }
  }

  // Generate and return the llms.txt content
  return getServerSideLLMsTxt(config)
}
```

This will generate a `/llms.txt` file in your output directory that follows the [llms.txt specification](https://llmstxt.org/).

The generated file will look like:

```markdown
# My Website

> A Next.js website with blog posts and documentation about web development.

This site contains articles about:
- JavaScript and TypeScript
- React and Next.js
- Web performance optimization
- SEO best practices

## Documentation

- [Getting Started](https://example.com/docs/getting-started) - Guide for beginners
- [API Reference](https://example.com/docs/api) - Complete API documentation

## Examples (optional)

- [Basic Example](https://example.com/examples/basic)
- [Advanced Example](https://example.com/examples/advanced) - For experienced users

## Contact

- Email: contact@example.com

---

*Generated using [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)*
```

Note: The `/llms.txt` standard is designed to provide LLMs with an overview of your site's structure and content. For more information, visit [llmstxt.org](https://llmstxt.org/).
