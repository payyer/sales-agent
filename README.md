# 🚀 Payyer Modern React Starter Kit

A professional, high-performance, and feature-rich foundation for building any modern web application.
Built with the latest technologies to help you launch your project with confidence.

---

## ✨ Features

- **Easy to use**: Simple folder structure.
- **Fast**: Built with Vite 8 for quick development.
- **Safe**: Full TypeScript support to find bugs early.
- **Multilingual**: Support for English and Vietnamese (i18n).
- **Responsive**: Works perfectly on Mobile, Tablet, and Desktop.
- **Error Safety**: Application won't crash thanks to Error Boundaries.

---

## 🛠 Tech Stack

- **Core**: React 19 + TypeScript
- **Style**: Tailwind CSS 4 (Modern & Clean)
- **State**: Zustand (Simple state management)
- **Data**: TanStack Query & Table (Powerful data handling)
- **Forms**: React Hook Form + Zod (Easy validation)
- **Icons**: Lucide React

---

## 📂 Folder Structure

```text
src/
├── api/          # Global API client (Axios)
├── components/
│   ├── ui/       # Atomic components (Base UI)
│   └── shared/   # Reusable parts (Data Tables, Layout parts)
├── features/     # Logic by feature (e.g., Customers)
├── hooks/        # Global custom React hooks
├── layouts/      # Main page layouts (Dashboard, Auth)
├── lib/          # Library configs (i18n, React Query)
├── locales/      # Translation files (en/vi)
├── pages/        # Main screens (Entry points)
├── providers/    # App context providers
├── routes/       # Router configuration
├── stores/       # Global state (Zustand)
└── types/        # Shared TypeScript interfaces
```

---

## 🏃 How to Start

### 1. Requirements

Make sure you have **Node.js** installed on your computer.

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment

Create a `.env` file and add:

```env
VITE_API_URL=https://api.example.com
```

### 4. Run development mode

```bash
npm run dev
```

---

## 📝 Coding Standards

1. **Features First**: Put logic related to a feature inside the `features/` folder.
2. **Use Types**: Always define interfaces for your data.
3. **Don't Repeat Yourself (DRY)**: Use components in `components/shared/` for common tasks.
4. **Keep it Clean**: Run `npm run lint` before you commit code to keep the project beautiful.

---

## 📜 Scripts

| Command          | Action                |
| :--------------- | :-------------------- |
| `npm run dev`    | Start local server    |
| `npm run build`  | Build for production  |
| `npm run lint`   | Check for code errors |
| `npm run format` | Fix code style        |
