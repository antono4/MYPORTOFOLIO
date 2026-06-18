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

### Vercel (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Deploy PortfolioForge"
git remote add origin https://github.com/yourusername/portfolio-forge.git
git push -u origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select "Import Third-Party Git Repository" if needed

3. **Add Environment Variables in Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.example`:
     ```
     NEXT_PUBLIC_SUPABASE_URL
     NEXT_PUBLIC_SUPABASE_ANON_KEY
     SUPABASE_SERVICE_ROLE_KEY
     NEXTAUTH_URL
     NEXTAUTH_SECRET
     GITHUB_CLIENT_ID
     GITHUB_CLIENT_SECRET
     STRIPE_SECRET_KEY
     STRIPE_WEBHOOK_SECRET
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
     NEXT_PUBLIC_APP_URL
     ```

4. **Deploy:**
   - Click "Deploy" or push to main branch
   - Your app will be live at `https://your-project.vercel.app`

### GitHub Actions (CI/CD)

The repository includes a GitHub Actions workflow in `.github/workflows/deploy.yml`. To use it:

1. Add `VERCEL_TOKEN` to your GitHub repository secrets:
   - Go to Settings → Secrets and variables → Actions
   - Add New repository secret: `VERCEL_TOKEN`

2. The workflow will automatically deploy on push to main.

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
