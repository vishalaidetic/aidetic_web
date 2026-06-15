'use client'

import { generateSlug } from '@/lib/utils/formatting'
import { cn } from '@/lib/utils'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="blog-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => {
            const id = generateSlug(React.Children.toArray(children).map(c => typeof c === 'string' ? c : '').join(''))
            return <h1 id={id} className="text-3xl font-bold text-[#0d253d] mt-10 mb-5 scroll-mt-24 tracking-tight">{children}</h1>
          },
          h2: ({ children }) => {
            const id = generateSlug(React.Children.toArray(children).map(c => typeof c === 'string' ? c : '').join(''))
            return <h2 id={id} className="text-2xl font-bold text-[#0d253d] mt-12 mb-4 scroll-mt-24 tracking-tight pb-3 border-b border-slate-100">{children}</h2>
          },
          h3: ({ children }) => {
            const id = generateSlug(React.Children.toArray(children).map(c => typeof c === 'string' ? c : '').join(''))
            return <h3 id={id} className="text-xl font-bold text-[#0d253d] mt-8 mb-3 scroll-mt-24">{children}</h3>
          },
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-[#0d253d] mt-6 mb-2">{children}</h4>
          ),
          p: ({ children }) => (
            <p className="text-[#374151] text-[1.05rem] leading-[1.85] my-5">{children}</p>
          ),
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer"
              className="text-[#533afd] font-medium hover:underline underline-offset-2">
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[#0d253d]">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-[#374151]">{children}</em>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-8 pl-6 pr-4 py-4 border-l-4 border-[#533afd] bg-[#533afd]/[0.03] rounded-r-xl text-slate-600 not-italic">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="my-5 space-y-2 list-none pl-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-5 space-y-2 list-decimal list-inside">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-2.5 text-[#374151] leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#533afd] shrink-0" />
              <span>{children}</span>
            </li>
          ),
          code: (props: any) => {
            const { children, className, ...rest } = props
            const match = /language-(\w+)/.exec(className || '')
            const isInline = !match && !className?.includes('hljs')

            if (isInline) {
              return (
                <code className="bg-[#ea2261]/[0.06] text-[#ea2261] px-1.5 py-0.5 rounded text-[0.88em] font-mono font-medium" {...rest}>
                  {children}
                </code>
              )
            }

            return (
              <div className="group relative my-8">
                {match?.[1] && (
                  <div className="absolute top-0 left-4 -translate-y-1/2 px-2.5 py-0.5 rounded bg-[#533afd] text-[10px] font-bold uppercase tracking-wider text-white z-10">
                    {match[1]}
                  </div>
                )}
                <pre className={cn(
                  "rounded-xl p-6 pt-8 overflow-x-auto border border-white/5 shadow-lg",
                  "bg-[#0f1117] text-gray-100 font-mono text-sm leading-relaxed"
                )}>
                  <code className={cn(className, "block")} {...rest}>{children}</code>
                </pre>
                <button
                  onClick={() => navigator.clipboard.writeText(String(children))}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white/70 text-xs font-medium border border-white/10 backdrop-blur-sm"
                >
                  Copy
                </button>
              </div>
            )
          },
          img: ({ src, alt }) => (
            <figure className="my-8">
              <img src={src} alt={alt || ''} className="w-full h-auto rounded-xl border border-slate-100 shadow-sm" />
              {alt && <figcaption className="text-center text-sm text-slate-400 mt-2 italic">{alt}</figcaption>}
            </figure>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-semibold text-[#0d253d] bg-slate-50 border-b border-slate-200">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-[#374151] border-b border-slate-100">{children}</td>
          ),
          hr: () => <hr className="my-10 border-slate-100" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
