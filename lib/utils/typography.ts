/**
 * Typography system for consistent text styling across the app
 * Centralizes all text formatting rules and utilities
 */

import { cn } from '@/lib/utils'

/**
 * Typography size variants
 */
export const typographyVariants = {
  h1: 'scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 text-3xl font-bold tracking-tight first:mt-0',
  h3: 'scroll-m-20 text-2xl font-bold tracking-tight',
  h4: 'scroll-m-20 text-xl font-bold tracking-tight',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
  blockquote: 'mt-6 border-l-2 border-border pl-6 italic',
  ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
  ol: 'my-6 ml-6 list-decimal [&>li]:mt-2',
  li: 'mt-2',
  code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
  pre: 'mb-4 overflow-x-auto rounded-lg border bg-muted p-4',
  small: 'text-sm font-medium leading-none',
  lead: 'text-xl text-muted-foreground',
  large: 'text-lg font-semibold',
  subtle: 'text-sm text-muted-foreground',
  muted: 'text-sm text-muted-foreground',
} as const

/**
 * Typography variant type
 */
export type TypographyVariant = keyof typeof typographyVariants

/**
 * Get typography class names for a variant
 */
export function getTypographyClass(variant: TypographyVariant, className?: string): string {
  return cn(typographyVariants[variant], className)
}

/**
 * Blog-specific typography helpers
 */
export const blogTypography = {
  title: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground',
  subtitle: 'text-lg sm:text-xl text-muted-foreground mt-4',
  meta: 'text-sm text-muted-foreground flex flex-wrap gap-4',
  body: 'prose dark:prose-invert max-w-none',
  excerpt: 'text-base text-muted-foreground leading-relaxed',
} as const

/**
 * Heading typography with responsive sizing
 */
export const headings = {
  h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold',
  h2: 'text-2xl sm:text-3xl lg:text-4xl font-bold',
  h3: 'text-xl sm:text-2xl lg:text-3xl font-bold',
  h4: 'text-lg sm:text-xl lg:text-2xl font-semibold',
} as const

/**
 * Text styles for common use cases
 */
export const textStyles = {
  label: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  button: 'text-sm font-medium',
  caption: 'text-xs text-muted-foreground',
  timestamp: 'text-xs text-muted-foreground',
} as const

/**
 * Line height utilities
 */
export const lineHeights = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
} as const
