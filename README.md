# Professional Next.js Blog Application

A production-ready, type-safe blog application with complete CRUD operations, built with modern web technologies and professional architecture patterns.

## 🚀 Features

- **✅ Complete CRUD Operations** - Create, Read, Update, Delete blog posts with admin dashboard
- **✅ Type-Safe Architecture** - Full TypeScript with Zod validation schemas
- **✅ Server-Side Rendering** - SSR for SEO optimization and dynamic pages
- **✅ Static Generation** - Pre-rendered static pages with ISR support
- **✅ Markdown Support** - GitHub-flavored markdown with custom rendering
- **✅ Admin Dashboard** - Protected admin panel for content management
- **✅ API Routes** - RESTful API endpoints with type-safe handlers
- **✅ Responsive UI** - Mobile-first design with shadcn/ui components
- **✅ Dark Mode** - Built-in theme switching with next-themes
- **✅ Professional Structure** - Clean, scalable, enterprise-grade codebase
- **✅ Database Integration** - Supabase PostgreSQL with type-safe queries

## 📋 Tech Stack

### Core Framework
- **Next.js 16.2.4** - React framework with App Router & Turbopack
- **React 19** - Latest React with Server Components
- **TypeScript 5.7** - Strict mode with full type safety

### Database & ORM
- **Supabase** - PostgreSQL with real-time capabilities
- **Zod** - Runtime schema validation with TypeScript inference

### UI & Styling
- **shadcn/ui** - High-quality Radix UI components
- **Tailwind CSS v4** - Utility-first CSS framework
- **next-themes** - Theme management (light/dark mode)

### Content & Rendering
- **react-markdown** - Markdown to React component conversion
- **remark-gfm** - GitHub Flavored Markdown support
- **lucide-react** - Beautiful SVG icons

### Form & Validation
- **react-hook-form** - Efficient form state management
- **@hookform/resolvers** - Zod resolver for form validation

### Development
- **pnpm** - Fast, space-efficient package manager
- **ESLint** - Code quality and linting

## 🏗️ Architecture Overview

### Layered Architecture

```
┌─────────────────────────────────────┐
│        Pages & Routes (UI)           │
│    (app/, pages/, components/)       │
├─────────────────────────────────────┤
│    Components & Client State        │
│    (React components, hooks)         │
├─────────────────────────────────────┤
│      API Layer & Handlers           │
│  (lib/api/, lib/middleware/)        │
├─────────────────────────────────────┤
│      Services & Business Logic      │
│  (lib/services/, lib/utils/)        │
├─────────────────────────────────────┤
│      Database & Queries             │
│      (lib/db/, Supabase)            │
├─────────────────────────────────────┤
│        Type System (TypeScript)      │
│        (lib/types/)                 │
└─────────────────────────────────────┘
```

### Directory Structure

```
├── app/                              # Next.js App Router
│   ├── (admin)/                     # Admin routes (route group)
│   ├── (blog)/                      # Public blog routes (route group)
│   ├── api/blogs/                   # API routes
│   ├── layout.tsx                   # Root layout with providers
│   ├── page.tsx                     # Landing page
│   └── globals.css                  # Global styles
│
├── components/                       # React components
│   ├── layout/                      # Layout components (nav, footer)
│   ├── blog/                        # Blog-specific components
│   ├── admin/                       # Admin-specific components
│   └── ui/                          # shadcn/ui components
│
├── lib/                              # Core application logic
│   ├── types/                       # TypeScript type definitions
│   ├── db/                          # Database layer
│   ├── api/                         # API utilities & handlers
│   ├── middleware/                  # Request middleware
│   ├── services/                    # Business logic services
│   └── utils/                       # Helper functions
│
├── config/                           # Configuration files
│   └── site.ts                      # Site-wide configuration
│
├── public/                           # Static assets
├── styles/                           # Global styles
│
├── SETUP.md                          # Detailed setup guide
├── README.md                         # This file
├── .env.example                      # Environment variables template
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
└── tailwind.config.ts                # Tailwind CSS configuration
```

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd <project-name>

# Install dependencies (already done, but just in case)
pnpm install
```

### 2. Configure Supabase

1. **Create Supabase Account**: Visit [supabase.com](https://supabase.com)
2. **Create New Project**: Wait for initialization
3. **Run Migrations**:
   - Go to SQL Editor
   - Create new query
   - Paste contents of `/lib/db/migrations.sql`
   - Execute
4. **Get Credentials**: Settings → API
   - Copy Project URL
   - Copy Anon Key
   - Copy Service Role Key

### 3. Set Environment Variables

1. Set `NEXT_PUBLIC_ADMIN_TOKEN` in your `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_ADMIN_TOKEN=your-secure-admin-token
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📱 Application Pages

### Public Pages
- **`/`** - Landing page with hero section and features
- **`/blog`** - Blog list with pagination
- **`/blog/[slug]`** - Individual blog post with full content

### Admin Pages
- **`/dashboard`** - Admin overview with blog statistics
- **`/dashboard/create`** - Create new blog post
- **`/dashboard/[id]/edit`** - Edit existing blog post

### API Endpoints
- **`GET /api/blogs`** - List all published blogs
- **`GET /api/blogs/[id]`** - Get specific blog
- **`POST /api/blogs`** - Create blog (admin only)
- **`PATCH /api/blogs/[id]`** - Update blog (admin only)
- **`DELETE /api/blogs/[id]`** - Delete blog (admin only)

## 🔐 Authentication

The application uses **token-based admin authentication**:

```typescript
// Include in API requests for protected endpoints
const headers = {
  'Authorization': `Bearer ${ADMIN_TOKEN}`
}
```

Admin token is verified in `/lib/middleware/auth.ts`

### For Production:
Consider implementing:
- JWT with Supabase Auth
- Role-based access control (RBAC)
- Session management
- OAuth integration

## 💾 Database Schema

### blogs table

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key, auto-generated |
| title | TEXT | Required, indexed |
| slug | TEXT | Required, unique, indexed |
| description | TEXT | Optional, for SEO |
| content | TEXT | Markdown content |
| author | TEXT | Required |
| featured_image | TEXT | Optional URL |
| published | BOOLEAN | Default: false |
| created_at | TIMESTAMP | Auto-set |
| updated_at | TIMESTAMP | Auto-update |

**Indexes**: slug, published, created_at

## 🎨 Styling & Theme

### Design System
- **Colors**: 5 main colors + neutrals with dark mode
- **Typography**: 2 font families with predefined sizes
- **Spacing**: Tailwind scale (4px base)
- **Borders**: Consistent radius via CSS variable

### Responsive Design
```
Mobile: < 640px
Tablet: 640px - 1024px  
Desktop: > 1024px
```

### Dark Mode
Automatically switches based on system preference. CSS variables defined in `app/globals.css`.

## 📝 Markdown Features

### Supported Syntax

```markdown
# Headings
## Subheadings
### Level 3

**Bold**, *Italic*, ~~Strikethrough~~

- Bullet list
1. Numbered list

> Blockquote

[Links](https://example.com)
![Images](https://example.com/img.jpg)

| Table | Header |
|-------|--------|
| Cell  | Cell   |

\`\`\`javascript
// Code blocks with language support
console.log("Hello!");
\`\`\`

---
```

## 🔧 API Usage Examples

### List Blogs

```bash
curl "http://localhost:3000/api/blogs?page=1&limit=10"
```

### Create Blog (Admin)

```bash
curl -X POST "http://localhost:3000/api/blogs" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog Post",
    "slug": "my-first-blog-post",
    "content": "# Hello\n\nThis is markdown content.",
    "author": "John Doe",
    "published": true
  }'
```

### Update Blog (Admin)

```bash
curl -X PATCH "http://localhost:3000/api/blogs/blog-id" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "published": true }'
```

## 🎯 Type Safety Highlights

### Zod Schemas with Type Inference

```typescript
// Schema definition
const BlogSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(50),
  // ...
})

// Automatic TypeScript type
type Blog = z.infer<typeof BlogSchema>

// Runtime validation
const blog = BlogSchema.parse(data) // Type-safe!
```

### API Response Types

```typescript
type ApiResponse<T> = 
  | { success: true; data: T }
  | { success: false; error: string }

// Type guards
if (response.success) {
  // data is available, TypeScript knows
  console.log(response.data)
}
```

### Type-Safe Database Queries

```typescript
const repository = getBlogRepository()
const blog = await repository.getBlogById(id) // Returns Blog type
const blogs = await repository.listBlogs(params) // Returns Blog[]
```

## 📊 Performance Optimizations

- **Server Components** - Reduced JavaScript sent to browser
- **Static Generation** - Pre-built HTML for fast delivery
- **Incremental Static Regeneration** - Keep content fresh
- **Image Optimization** - Automatic image resizing
- **Code Splitting** - Lazy load routes and components
- **Database Indexing** - Fast queries on slug, published, date
- **CSS Optimization** - Tailwind CSS purges unused styles

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in project settings
4. Deploy!

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=https://prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod-anon-key
SUPABASE_SERVICE_ROLE_KEY=prod-service-role-key
ADMIN_TOKEN=secure-production-token
NEXT_PUBLIC_SITE_URL=https://yourblog.com
```

## 🤝 Contributing

This is a learning/reference project. Feel free to:
- Study the code structure
- Fork and customize
- Use as a template for your own projects

## 📚 Learning Resources

### TypeScript
- [Official Handbook](https://www.typescriptlang.org/docs/)
- [Advanced Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)

### Next.js
- [App Router Docs](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

### React
- [Official Docs](https://react.dev)
- [Server Components Guide](https://react.dev/reference/rsc/server-components)

### Database
- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### UI/Styling
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## 📖 Full Setup Guide

See [SETUP.md](./SETUP.md) for comprehensive setup instructions and troubleshooting.

## 📄 License

MIT License - Feel free to use this project for any purpose.

## 🙏 Acknowledgments

Built with:
- Next.js & Vercel team
- React & Vercel AI SDK
- shadcn/ui community
- TypeScript community
- Supabase team

---

**Built with ❤️ using Next.js, TypeScript, and modern web standards.**

For questions or issues, check the [SETUP.md](./SETUP.md) or explore the well-documented source code.
