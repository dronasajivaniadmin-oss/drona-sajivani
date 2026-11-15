# DRONA SAJIVANI — Phase 1 development starter

A **source-code starter**, not a deployed or production-ready marketplace. Uses Next.js App Router, PostgreSQL, bcrypt password hashing and signed HttpOnly session cookies.

## Run locally
1. Install Node.js 20+ and PostgreSQL 15+.
2. `npm install`
3. Copy `.env.example` to `.env`, configure `DATABASE_URL`, and generate a long random `JWT_SECRET`.
4. Create the `drona` database and apply `sql/schema.sql` with `psql`.
5. `npm run dev` and open http://localhost:3000.

## Implemented starter endpoints
- `POST /api/auth/register` JSON `{name,email,password}` (12+ character password); creates **customer only**.
- `POST /api/auth/login` JSON `{email,password}`; sets secure-in-production HttpOnly session cookie.
- `POST /api/sellers/apply` JSON `{businessName}`; requires login; seller starts **pending**.
- `GET /api/admin/sellers` admin only; lists applications.
- `PATCH /api/admin/sellers` JSON `{sellerId,status}` where status is `approved` or `rejected`; admin only.
- `GET /api/products` public; only approved products of approved sellers.

## Security / production blockers
- **No admin account is created automatically.** After verifying the owner's identity via a secure out-of-band process, an authorized deployer must provision exactly one admin account. Never expose a public admin-signup route.
- Add rate limiting, email verification, CSRF protection for cookie-authenticated mutations, audit logging, password reset, MFA, admin account recovery, monitoring, backups, secret management and full integration tests before production.
- Product creation/moderation UI, cart, checkout, order placement, commission calculation/settlement, shipping integrations, payment processing, seller dashboard and full bilingual translations **are not implemented**.
- No payments or customer orders should be accepted until required business/tax compliance and provider onboarding are complete.
- The homepage is an initial responsive implementation inspired by the approved navy/gold theme; it is not a pixel-perfect reproduction of the previous design mockup.
