# [Project Name]

A React single-page application template with authentication, routing, and a design system built on Ant Design.

## 📑 Table of Contents

- [[Project Name]](#project-name)
  - [📑 Table of Contents](#-table-of-contents)
  - [✨ Features](#-features)
  - [🛠️ Technologies Used](#️-technologies-used)
  - [🚀 Getting Started](#-getting-started)
    - [⚙️ Prerequisites](#️-prerequisites)
    - [💾 Installation](#-installation)
    - [🏃 Running the App](#-running-the-app)
  - [📝 Configuration](#-configuration)
  - [📂 Project Structure](#-project-structure)
  - [🤝 Contributing](#-contributing)

## ✨ Features

- **User authentication** — Login, register, forgot/reset password with JWT tokens
- **Role-based access** — Guest, private, and admin route guards
- **Dashboard** — Authenticated dashboard with admin-specific views
- **Responsive design** — Mobile through ultra-wide breakpoints (320px–1440px+)
- **Dark mode** — System-respecting theme with manual toggle support
- **Code splitting** — Route-level lazy loading via React.lazy + Suspense
- **Design system** — DESIGN.md as source of truth with SCSS tokens + Ant Design theme

[⬆️ Back to Top](#project-name)

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 19 | UI framework |
| [TypeScript](https://www.typescriptlang.org) | 5.8 | Type safety |
| [Vite](https://vite.dev) | 7 | Build tool & dev server |
| [Redux Toolkit](https://redux-toolkit.js.org) | 2 | State management |
| [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) | 2 | API data fetching & caching |
| [Ant Design](https://ant.design) | 5 | UI component library |
| [React Router](https://reactrouter.com) | 7 | Client-side routing |
| [Sass](https://sass-lang.com) | 1 | CSS preprocessing with CSS Modules |
| [Inter](https://rsms.me/inter/) | 5 | Primary typeface (via `@fontsource/inter`) |

[⬆️ Back to Top](#project-name)

## 🚀 Getting Started

### ⚙️ Prerequisites

- **Node.js** ≥ 18 (required by Vite 7 and TypeScript 5.8)
- **npm** ≥ 9 (or yarn/pnpm)

### 💾 Installation

```sh
# Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install dependencies
npm install
```

[⬆️ Back to Top](#project-name)

### 🏃 Running the App

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server (default: `http://localhost:5173`) |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

[⬆️ Back to Top](#project-name)

## 📝 Configuration

Environment variables are set via `.env` files (Vite only exposes `VITE_`-prefixed variables).

| Variable | Default | Description |
|---|---|---|
| `VITE_ENV` | `local` | Environment name (`dev`, `prod`, `local`) |
| `VITE_BASE_API_URL` | `http://127.0.0.1:8000` | Backend API base URL |
| `VITE_API_VERSION` | `/api/v1` | API version path prefix |

The full API base URL is constructed as `{VITE_BASE_API_URL}{VITE_API_VERSION}` (e.g., `http://127.0.0.1:8000/api/v1`).

### Environment Files

| File | Purpose |
|---|---|
| `.env` | Shared defaults (all environments) |
| `.env.development` | Development overrides (`npm run dev`) |
| `.env.production` | Production overrides (`npm run build`) |

[⬆️ Back to Top](#project-name)

## 📂 Project Structure

```
src/
├── app/              # App shell: routing, store, layouts, theme, API base
│   ├── api/          # RTK Query baseApi + re-auth logic
│   ├── layouts/      # Public, private, and admin layout components
│   ├── routing/      # Route config, lazy loader, guards, error boundary
│   ├── store/        # Redux store + typed hooks
│   └── theme/        # Ant Design ConfigProvider + design tokens
├── config/           # Environment variable accessors
├── features/         # Feature slices (each with pages, components, hooks, api, state)
│   ├── auth/         # Login, register, password reset, session management
│   ├── dashboard/    # Authenticated dashboard views
│   └── home/         # Public landing page
├── shared/           # Cross-feature code
│   ├── components/   # Shared UI components
│   ├── pages/        # Shared pages (404, unauthorized)
│   ├── types/        # Shared TypeScript types and domain models
│   └── utils/        # Error handling and shared utilities
└── styles/           # Global SCSS: variables, reset, animations, dark mode
```

Routes are declared per-feature in `src/features/<feature>/routes.tsx` and aggregated in `src/app/routing/routes.tsx`. Route guards (`public`, `guest`, `private`, `admin`) control access and automatically select the appropriate layout.

[⬆️ Back to Top](#project-name)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Follow the code conventions in [repo-standards.md](.opencode/knowledge/repo-standards.md)
4. Ensure `npm run lint` and `npm run build` pass
5. Open a pull request

---

_Built with ❤️ by [Your Name](https://github.com/your-username)_

[⬆️ Back to Top](#project-name)
