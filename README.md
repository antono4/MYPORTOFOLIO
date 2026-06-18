# PortfolioForge

**Automated Portfolio Website Generator for Developers**

Build stunning developer portfolios in minutes with AI-powered automation. Import your GitHub profile, customize templates, and deploy with one click.

![PortfolioForge](https://via.placeholder.com/1200x600/6366f1/ffffff?text=PortfolioForge)

## Features

- 🚀 **GitHub Import** - Automatically import your repositories and profile data
- 🎨 **5 Beautiful Templates** - Minimal, Creative, Dark Mode, Card-based, Classic
- ⚡ **One-Click Deploy** - Publish your portfolio instantly
- 📊 **Built-in Analytics** - Track your portfolio views and visitors
- 💳 **Premium Tiers** - Remove watermark and unlock custom domains
- 🔐 **Secure Authentication** - GitHub OAuth and email/password login

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Supabase)
- **Auth**: NextAuth.js
- **Payments**: Stripe
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account
- GitHub OAuth App

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio-forge.git
cd portfolio-forge
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your credentials in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Set up the database:
   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Run the migration in `supabase/migrations/20240101000000_initial_schema.sql`

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio-forge/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── (dashboard)/       # Dashboard pages
│   │   ├── api/               # API routes
│   │   └── portfolio/         # Public portfolio pages
│   ├── components/
│   │   ├── ui/                # UI components
│   │   └── templates/         # Portfolio templates
│   ├── lib/                   # Utilities
│   └── types/                 # TypeScript types
├── supabase/                  # Database migrations
└── public/                    # Static files
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/github` - GitHub OAuth

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile

### Payments
- `POST /api/payments/create-checkout-session` - Create Stripe checkout

### Admin
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id/suspend` - Suspend user

## Deployment

### Option 1: Connect GitHub to Vercel (Recommended)

1. **Push to GitHub:**
```bash
git remote add origin https://github.com/antono4/MYPORTOFOLIO.git
git push -u origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" → "Import Git Repository"
   - Select `antono4/MYPORTOFOLIO`
   - Vercel will auto-detect Next.js framework

3. **Add Environment Variables:**
   Go to Project Settings → Environment Variables and add:
   
   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
   | `NEXTAUTH_SECRET` | Generate at https://generate-secret.vercel.app |
   | `NEXTAUTH_URL` | `https://your-project.vercel.app` |
   | `GITHUB_CLIENT_ID` | From GitHub OAuth App |
   | `GITHUB_CLIENT_SECRET` | From GitHub OAuth App |
   | `STRIPE_SECRET_KEY` | `sk_test_...` |
   | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` |
   | `NEXT_PUBLIC_APP_URL` | `https://your-project.vercel.app` |

4. **Deploy:**
   - Click "Deploy"
   - Done! Your app is live

### Option 2: GitHub Actions CI/CD

1. **Get Vercel Token:**
   - Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
   - Create a new token with name "GitHub-Actions"

2. **Add Secret to GitHub:**
   - Go to your repo → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `VERCEL_TOKEN`
   - Value: paste your Vercel token

3. **Push code:**
   ```bash
   git push origin main
   ```
   The workflow will automatically deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

- Create an issue for bugs
- Join our Discord for community support

---

Built with ❤️ for developers everywhere
