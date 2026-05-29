# ──────────────────────────────────────────────
# Stage 1 – deps: install dependencies with npm
# ──────────────────────────────────────────────
FROM node:22-alpine AS deps

# Install libc compat for native modules on alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files to leverage Docker layer caching
COPY package.json package-lock.json ./

# Clean install — uses package-lock.json for reproducible builds
RUN npm ci

# ──────────────────────────────────────────────
# Stage 2 – builder: compile the Next.js app
# ──────────────────────────────────────────────
FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Re-use installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the full source
COPY . .

# Disable Next.js telemetry during the build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application (outputs standalone server)
RUN npm run build

# ──────────────────────────────────────────────
# Stage 3 – runner: lean production image
# ──────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root system user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Create .next directory with correct ownership
RUN mkdir -p .next && chown nextjs:nodejs .next

# Copy only the minimal standalone output (no raw source, no devDependencies)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static    ./.next/static

# Switch to non-root user
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the standalone Next.js server
CMD ["node", "server.js"]
