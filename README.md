# Team Tasks App

A full-stack, production-ready task management application built with modern technologies. This project demonstrates a complete CI/CD pipeline with infrastructure as code.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Infrastructure](#infrastructure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **Authentication**
  - Email OTP/Magic Link via Supabase Auth
  - Protected routes and API endpoints
  - Session management

- **Task Management**
  - Create, Read, Update, Delete (CRUD) operations
  - Status tracking (todo, doing, done)
  - Per-user task isolation

- **Security**
  - Row Level Security (RLS) in Supabase
  - Secure API endpoints
  - Environment variable protection

## 🛠 Technology Stack

- **Frontend**:
  - Next.js 14+ (App Router)
  - TypeScript
  - Tailwind CSS
  - Supabase Client SDK

- **Backend**:
  - Supabase (Database + Auth)
  - Next.js API Routes
  - Row Level Security

- **Infrastructure**:
  - Docker
  - Azure Virtual Machine
  - Terraform
  - GitHub Actions

## 📝 Prerequisites

1. Node.js 18+
2. pnpm (`npm install -g pnpm`)
3. Docker
4. Azure CLI
5. Terraform
6. Git
7. VS Code (recommended)

## 💻 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/jahangir842/supa-app.git
   cd supa-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```
   Visit http://localhost:3000

## 📁 Project Structure

```
.
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── healthz/      # Health check endpoint
│   │   ├── auth/             # Auth pages
│   │   └── tasks/            # Task management pages
│   ├── lib/
│   │   └── supabase/         # Supabase client configuration
│   └── components/           # React components
├── supabase/
│   ├── schema.sql           # Database schema with RLS
│   └── seed.sql            # Development data
├── infra/
│   └── terraform/          # Infrastructure as Code
│       ├── main.tf         # Main Terraform configuration
│       ├── variables.tf    # Variable definitions
│       └── outputs.tf      # Output definitions
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── Dockerfile             # Multi-stage Docker build
├── docker-compose.yml     # Local development with Docker
└── README.md
```

## 🔐 Environment Variables

1. **Local Development**
   - `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key

2. **Production/GitHub Secrets**
   - All of the above, plus:
   - `VM_HOST`: Azure VM IP address
   - `VM_USER`: VM admin username
   - `VM_SSH_KEY`: SSH private key
   - `VM_SSH_PORT`: SSH port (usually 22)

## 🗄 Database Setup

1. **Create Supabase Project**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Create a new project
   - Copy the URL and anon key

2. **Run Migrations**
   ```bash
   # From the Supabase dashboard SQL editor
   # Copy and run the contents of:
   supabase/schema.sql
   supabase/seed.sql  # Optional, for development data
   ```

## 🏗 Infrastructure

### Azure Setup

1. **Install Azure CLI**
   ```bash
   curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
   az login
   ```

2. **Generate SSH Key** (if needed)
   ```bash
   ssh-keygen -t rsa -b 4096
   ```

3. **Terraform Setup**
   ```bash
   cd infra/terraform
   
   # Create terraform.tfvars
   cat > terraform.tfvars << EOL
   project_name = "supa-app"
   location = "eastus"
   environment = "dev"
   admin_username = "azureuser"
   ssh_public_key_path = "~/.ssh/id_rsa.pub"
   EOL

   # Initialize and apply
   terraform init
   terraform plan
   terraform apply
   ```

## 🚀 Deployment

### Manual Deployment

1. **Build Docker image**
   ```bash
   docker build -t supa-app .
   ```

2. **Run container**
   ```bash
   docker run -d \
     -p 3000:3000 \
     -e NEXT_PUBLIC_SUPABASE_URL=your_url \
     -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
     supa-app
   ```

### Automated Deployment (GitHub Actions)

1. **Set up GitHub Secrets**
   Add all required secrets in GitHub repository settings.

2. **Trigger Deployment**
   - Push to main branch, or
   - Manual trigger in Actions tab

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit changes
4. Push to branch
5. Open Pull Request

## 💭 Troubleshooting

### Common Issues

1. **Supabase Connection Issues**
   - Verify environment variables
   - Check Supabase project status
   - Ensure RLS policies are correct

2. **Docker Build Failures**
   - Check Node.js version compatibility
   - Verify Dockerfile configuration
   - Clear Docker cache: `docker system prune`

3. **Terraform Errors**
   - Verify Azure credentials
   - Check resource name availability
   - Ensure proper variable values

### Health Checks

- API: `http://your-domain/api/healthz`
- Database: Check Supabase dashboard
- Infrastructure: `terraform plan` for state verification

## 📄 License

MIT License - feel free to use this project for learning or production use.

---

For additional support, please open an issue on GitHub.

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
