/**
 * Site configuration and metadata
 * Centralized configuration for the entire application
 */

export const siteConfig = {
  // Site metadata
  name: 'Tech Blog',
  description: 'A professional blog platform for technical content',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
  
  // Navigation
  // Note: Admin link is intentionally excluded — its path is UUID-obfuscated
  // and resolved at runtime via NEXT_PUBLIC_ADMIN_ROUTE_UUID.
  navMain: [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
  ],
  
  // Footer links
  footerNav: {
    product: [
      {
        title: 'Home',
        href: '/',
      },
      {
        title: 'Blog',
        href: '/blog',
      },
    ],
    resources: [
      {
        title: 'Documentation',
        href: '#',
      },
      {
        title: 'GitHub',
        href: '#',
      },
      {
        title: 'Twitter',
        href: '#',
      },
    ],
    legal: [
      {
        title: 'Privacy Policy',
        href: '#',
      },
      {
        title: 'Terms of Service',
        href: '#',
      },
    ],
  },

  // Blog configuration
  blog: {
    postsPerPage: 10,
    featuredPostsCount: 3,
  },

  // Admin configuration
  admin: {
    // Set to true to require authentication for admin routes
    requireAuth: false,
    // Redirect unauthenticated users to login page
    loginUrl: '/admin/login',
  },

  // Features
  features: {
    darkMode: true,
    markdown: true,
    comments: false,
    search: false,
  },

  // API configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    timeout: 30000,
  },
} as const

// Export types for the config
export type SiteConfig = typeof siteConfig
