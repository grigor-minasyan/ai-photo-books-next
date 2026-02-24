This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Database (Drizzle + Postgres)

1. Copy `.env.example` to `.env` and set `DATABASE_URL`.
2. Generate migration files:

```bash
bun run db:generate
```

3. Apply migrations:

```bash
bun run db:migrate
```

4. Seed initial AI book data (products, pages, prompts, characters, generated source books):

```bash
bun run db:seed
```

Optional:

```bash
bun run db:studio
```

## Authentication (Better Auth + Drizzle)

This project now includes Better Auth with:

- Email/password auth
- Email OTP verification required during signup flow
- Role support (`user` and `admin`)

### Environment variables

Copy `.env.example` to `.env` and set:

- `BETTER_AUTH_SECRET` (32+ chars)
- `BETTER_AUTH_URL` (for local: `http://localhost:3000`)
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

### Auth setup commands

```bash
# Generate Better Auth Drizzle schema
bun run auth:generate

# One-time Cursor MCP setup for Better Auth docs/tools
bun run auth:mcp

# Sync auth + drizzle migrations
bun run auth:sync
```

### Manual admin assignment (for your account)

New users default to role `user`. To manually make your account admin:

```sql
UPDATE "user"
SET "role" = 'admin'
WHERE "email" = 'your-email@example.com';
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
