# Next.js Blog Application - Setup Guide

A professional, type-safe blog application built with **Next.js 16**, **TypeScript**, **React 19**, **Supabase**, **shadcn/ui**, and **Tailwind CSS**.

## Features

✅ **Complete CRUD Operations** - Create, read, update, and delete blog posts  
✅ **Type-Safe Architecture** - Full TypeScript with Zod validation  
✅ **SSR & Static Generation** - Server-side rendering and optimized static pages  
✅ **Markdown Support** - GitHub flavored markdown with custom rendering  
✅ **Admin Dashboard** - Protected admin panel for managing posts  
✅ **Responsive Design** - Mobile-first UI with shadcn/ui components  
✅ **Dark Mode** - Built-in theme support with next-themes  
✅ **Professional Structure** - Clean, scalable codebase organization  

## Quick Start

### 1. Set Up Supabase Database

#### Option A: Using Supabase Dashboard

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project and wait for it to initialize
3. Go to **SQL Editor** in the left sidebar
4. Create a new query and paste the contents of `/lib/db/migrations.sql`
5. Execute the migration to create the `blogs` table
6. Copy your project credentials:
   - Project URL: from Settings → API
   - Anon Key: from Settings → API
   - Service Role Key: from Settings → API (keep this secret!)

#### Option B: Using the Supabase v0 Integration

1. Click **Settings** (top right) → **Integrations**
2. Connect your Supabase project
3. Run the migrations through Supabase dashboard

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase (from Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Admin authentication token (change this!)
ADMIN_TOKEN=your-secure-admin-token-here

# Site URL (optional, defaults to http://localhost:3000)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Install Dependencies

All dependencies are already installed. If you need to reinstall:

```bash
pnpm install
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Access the Application

- **Homepage**: http://localhost:3000
- **Blog**: http://localhost:3000/blog
- **Admin Dashboard**: http://localhost:3000/dashboard
- **Create Post**: http://localhost:3000/dashboard/create

## Project Structure

```
lib/
├── types/              # TypeScript types and Zod schemas
│   ├── blog.ts        # Blog entity types with validation
│   ├── api.ts         # API response types and error classes
│   └── common.ts      # Common types (pagination, metadata, etc)
├── db/                # Database layer
│   ├── client.ts      # Supabase client initialization
│   ├── queries.ts     # Type-safe database queries (BlogRepository)
│   ├── types.ts       # Supabase schema types
│   └── migrations.sql # Database migration SQL
├── api/               # API utilities
│   ├── handlers.ts    # Type-safe API request handlers
│   └── response.ts    # Response formatting (deleted - using handlers)
├── middleware/        # Request middleware
│   └── auth.ts        # Admin authentication middleware
├── services/          # Business logic layer
│   └── markdown.service.ts # Markdown processing utilities
└── utils/             # Helper utilities
    ├── formatting.ts  # Date, slug, text formatting functions
    ├── typography.ts  # Typography system and Tailwind utilities
    └── constants.ts   # App constants and configuration

components/
├── layout/
│   ├── navigation.tsx # Responsive header/navigation
│   ├── footer.tsx     # Footer component
│   └── providers.tsx  # Client-side providers (theme, etc)
├── blog/
│   ├── blog-card.tsx      # Blog preview card component
│   ├── blog-content.tsx   # Markdown content renderer
│   └── blog-list.tsx      # Blog list container (if needed)
└── admin/
    ├── blog-form.tsx      # Create/edit form with markdown preview
    └── delete-dialog.tsx  # Delete confirmation (optional)

app/
├── (blog)/                # Public blog routes
│   ├── layout.tsx        # Blog section layout
│   ├── blog/
│   │   ├── page.tsx      # Blog list page (pagination)
│   │   └── [slug]/
│   │       └── page.tsx  # Blog detail page (SSR with dynamic metadata)
├── (admin)/               # Admin routes
│   ├── layout.tsx        # Admin layout
│   └── dashboard/
│       ├── page.tsx      # Dashboard overview
│       ├── create/
│       │   └── page.tsx  # Create blog post page
│       └── [id]/
│           └── edit/
│               └── page.tsx # Edit blog post page
├── api/
│   └── blogs/
│       ├── route.ts      # GET (list) / POST (create) endpoints
│       └── [id]/route.ts # GET (detail) / PATCH (update) / DELETE endpoints
├── layout.tsx            # Root layout with theme provider
└── page.tsx              # Landing page
```

## API Endpoints

All endpoints return standardized API responses:

```typescript
{
  success: true | false,
  data?: T,
  error?: string,
  message?: string,
  details?: Record<string, unknown>
}
```

### Public Endpoints (No Auth Required)

#### GET /api/blogs
List published blog posts with pagination

**Query Parameters:**
- `page` (default: 1) - Page number
- `limit` (default: 10) - Items per page
- `published` (default: 'true') - 'true' | 'false' | 'all'

**Response:**
```json
{
  "success": true,
  "data": {
    "blogs": [{ ...blog }],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 42,
      "totalPages": 5
    }
  }
}
```

#### GET /api/blogs/[id]
Get a specific blog by ID

**Response:**
```json
{
  "success": true,
  "data": { ...blog }
}
```

### Protected Endpoints (Admin Token Required)

Send admin token in request header:
```
Authorization: Bearer YOUR_ADMIN_TOKEN
```

#### POST /api/blogs
Create a new blog post

**Request Body:**
```json
{
  "title": "string",
  "slug": "string",
  "description": "string | null",
  "content": "string (markdown)",
  "author": "string",
  "featured_image": "string (url) | null",
  "published": "boolean"
}
```

#### PATCH /api/blogs/[id]
Update a blog post (partial updates supported)

#### DELETE /api/blogs/[id]
Delete a blog post

## Markdown Features

The blog supports GitHub-flavored markdown:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
~~Strikethrough~~

- Bullet list
- Item 2

1. Numbered list
2. Item 2

[Link text](https://example.com)
![Image alt](https://example.com/image.jpg)

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |

> Blockquote text

\`\`\`javascript
// Code block with syntax highlighting
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

---

Horizontal rule above
```

## TypeScript Architecture

### Type Safety Throughout

- **Zod Schemas** for runtime validation with TypeScript inference
- **Branded Types** for sensitive values (BlogSlug, etc)
- **Generics** for reusable components and utilities
- **Type Guards** for discriminated unions (API responses)
- **Strict Mode** enabled in tsconfig.json

### Type Definition Files

#### blog.ts
```typescript
// Blog entity with Zod schema
type Blog = { id: UUID, title: string, ... }
type BlogCreateInput = Omit<Blog, 'id' | 'created_at' | 'updated_at'>
type BlogListQuery = { page: number, limit: number, ... }
```

#### api.ts
```typescript
// API response types
type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse
type ApiError extends Error { statusCode, code, details? }
type ValidationError extends ApiError { /* ... */ }
type NotFoundError extends ApiError { /* ... */ }
type UnauthorizedError extends ApiError { /* ... */ }
```

## Admin Authentication

The application uses a simple token-based authentication for admin operations:

1. NEXT_PUBLIC_ADMIN_TOKEN=your-secure-admin-token-here in API requests:
   ```typescript
   const headers = {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${ADMIN_TOKEN}`
   }
   ```

For production, consider implementing:
- JWT-based authentication
- Supabase Auth integration
- Role-based access control (RBAC)

## Theme & Styling

The application includes a centralized theme system:

### Theme Colors (CSS Variables)
Located in `app/globals.css`:
- `--background` / `--foreground`
- `--primary` / `--primary-foreground`
- `--secondary` / `--secondary-foreground`
- `--accent` / `--accent-foreground`
- `--muted` / `--muted-foreground`
- And more...

### Typography System
Located in `lib/utils/typography.ts`:
- Predefined text sizes and weights
- Blog-specific typography helpers
- Responsive heading utilities

### Dark Mode
Automatically enabled via `next-themes`:
- System preference detection
- Manual theme toggle ready
- CSS variable switching

## Database Schema

### blogs table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, Default gen_random_uuid() | Unique blog identifier |
| title | TEXT | NOT NULL | Blog post title |
| slug | TEXT | NOT NULL, UNIQUE | URL-friendly identifier |
| description | TEXT | NULL | SEO description |
| content | TEXT | NOT NULL | Markdown content |
| author | TEXT | NOT NULL | Author name |
| featured_image | TEXT | NULL | Featured image URL |
| published | BOOLEAN | Default FALSE | Publication status |
| created_at | TIMESTAMP | Default NOW() | Creation timestamp |
| updated_at | TIMESTAMP | Default NOW(), Auto-update | Last update timestamp |

### Indexes

- `idx_blogs_slug` - For fast slug lookups
- `idx_blogs_published` - For filtering by status
- `idx_blogs_created_at` - For sorting by date

## Development Best Practices

### Code Organization

1. **Types First** - Define types before implementation
2. **Server by Default** - Use Server Components, `'use client'` only when needed
3. **Type Safety** - Always provide proper TypeScript types
4. **Error Handling** - Use custom error types for proper error responses
5. **Separation of Concerns** - Keep business logic in services, UI in components

### Common Tasks

#### Add a New API Endpoint

1. Create route handler in `/app/api/[resource]/route.ts`
2. Use `handleApiRequest` wrapper from `/lib/api/handlers.ts`
3. Define request/response types in `/lib/types/`
4. Implement business logic in a service class

#### Modify Database Schema

1. Update the migration in `/lib/db/migrations.sql`
2. Run migration in Supabase dashboard
3. Update `/lib/db/types.ts` with new types
4. Update queries in `/lib/db/queries.ts`

#### Add New Theme Color

1. Add CSS variable in `app/globals.css` (`:root` and `.dark`)
2. Add Tailwind color mapping in `tailwind.config.ts` if needed
3. Use the new color via `bg-[var-name]` or Tailwind class

## Deployment

### To Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_TOKEN=your-secure-token
NEXT_PUBLIC_SITE_URL=https://yourblog.com
```

## Troubleshooting

### "Missing Supabase server environment variables"

- Ensure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- For API routes, also set `SUPABASE_SERVICE_ROLE_KEY`

### Blog posts not loading

1. Verify Supabase connection in project settings
2. Check that `blogs` table exists in Supabase
3. Verify the table has published posts
4. Check browser console for error details

### Admin operations not working

1. Verify `ADMIN_TOKEN` is set in `.env.local`
2. Ensure token matches in API requests
3. Check request headers include `Authorization: Bearer TOKEN`

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

## License

This project is open source and available under the MIT License.
