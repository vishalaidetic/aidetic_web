'use client'

import { generateSlug } from '@/lib/utils/formatting'
import { blogTypography } from '@/lib/utils/typography'
import { cn } from '@/lib/utils'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

interface BlogContentProps {
  content: string
}

/**
 * Blog content renderer
 * Renders markdown content with GitHub flavored markdown support, syntax highlighting, and professional styling
 */
export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => {
            const text = React.Children.toArray(children).map(child => typeof child === 'string' ? child : '').join('')
            const id = generateSlug(text)
            return (
              <h1 id={id} className={blogTypography.title}>
                {children}
              </h1>
            )
          },
          h2: ({ children }) => {
            const text = React.Children.toArray(children).map(child => typeof child === 'string' ? child : '').join('')
            const id = generateSlug(text)
            return (
              <h2 id={id} className="text-2xl sm:text-3xl font-bold mt-8 mb-4 scroll-mt-24">
                {children}
              </h2>
            )
          },
          h3: ({ children }) => {
            const text = React.Children.toArray(children).map(child => typeof child === 'string' ? child : '').join('')
            const id = generateSlug(text)
            return (
              <h3 id={id} className="text-xl sm:text-2xl font-bold mt-6 mb-3 scroll-mt-24">
                {children}
              </h3>
            )
          },
          h4: ({ children }) => (
            <h4 className="text-lg font-bold mt-4 mb-2">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-base leading-relaxed my-4">
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              {children}
            </a>
          ),
          code: (props: any) => {
            const { children, className, node, ...rest } = props
            const match = /language-(\w+)/.exec(className || '')
            const isInline = !match && !className?.includes('hljs')
            const language = match ? match[1] : ''

            if (isInline) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary font-medium" {...rest}>
                  {children}
                </code>
              )
            }

            return (
              <div className="group relative my-8">
                {/* {language && (
                  <div className="absolute top-0 left-6 -translate-y-1/2 px-3 py-1 rounded-md bg-primary text-[10px] font-bold uppercase tracking-widest text-primary-foreground z-20 shadow-sm">
                    {language}
                  </div>
                )} */}
                <pre className={cn(
                  "rounded-xl p-6 overflow-x-auto border border-border shadow-md",
                  "bg-[#1e1e1e] text-gray-100 font-mono text-sm leading-relaxed"
                )}>
                  <code className={cn(className, "block")} {...rest}>
                    {children}
                  </code>
                </pre>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(String(children))
                    }}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 transition-colors text-xs font-medium backdrop-blur-sm border border-white/10"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 my-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 my-4">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="ml-4">
              {children}
            </li>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt || 'Content image'}
              className="w-full h-auto rounded-lg my-6 border border-border"
            />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="w-full border-collapse border border-border">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border bg-muted p-2 text-left font-bold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border p-2">
              {children}
            </td>
          ),
          hr: () => (
            <hr className="my-6 border-border" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
