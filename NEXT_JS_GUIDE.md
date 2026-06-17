# 🎓 Oral Roberts University — Next.js Migration & Integration Guide

This project is built using modular, highly robust, and standard React TypeScript functional components, making-it 100% compatible with **Next.js (App Router or Pages Router)**. 

Below is the step-by-step blueprint to run this exact application inside Next.js with **Tailwind CSS** and our beautiful **Deep Royal Navy Blue** & **Crimson Red** academic color theme.

---

## 🚀 Step 1: Create a Next.js Project
Initialize a new Next.js project with TypeScript and Tailwind CSS:
```bash
npx create-next-app@latest oru-ph-nextjs --typescript --tailwind --app --src-dir
```

---

## 🎨 Step 2: Set Up the Academic Red & Blue Theme
Next.js uses standard Tailwind CSS. In your new Next.js project, replace the contents of `/src/app/globals.css` with the exact theme bindings and custom color definitions we designed for your branding.

Paste this into your Next.js `/src/app/globals.css`:
```css
@import "tailwindcss";

@theme {
  /* Override emerald shades to a premium Royal & Deep Navy Blue palette */
  --color-emerald-50: #f4f7fc;
  --color-emerald-100: #e6eef8;
  --color-emerald-150: #d6e3f2;
  --color-emerald-200: #bccfeb;
  --color-emerald-250: #97b5e0;
  --color-emerald-300: #6a95d1;
  --color-emerald-500: #1d4ed8;
  --color-emerald-700: #1e40af;
  --color-emerald-800: #1e3a8a;
  --color-emerald-850: #0f2249;
  --color-emerald-900: #0b152d;
  --color-emerald-950: #070d1d;

  /* Override amber shades to a deep, prestigious Crimson Red & Dark Burgundy palette */
  --color-amber-50: #fff5f5;
  --color-amber-100: #ffe3e3;
  --color-amber-200: #ffc9c9;
  --color-amber-400: #f87171;
  --color-amber-500: #be123c; /* Academic Deep Crimson / Rose Red */
  --color-amber-600: #9f1239;
  --color-amber-700: #881337;
  --color-amber-800: #4c0519;
  --color-amber-900: #27020b;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f8fafc;
  color: #0f172a;
}
```

---

## 📂 Step 3: Copy Source Code & Components
Copy the folders from this project directly onto your Next.js workspace structure:

1. Copy `/src/components/*` to `oru-ph-nextjs/src/components/`
2. Copy `/src/data.ts` to `oru-ph-nextjs/src/data.ts`
3. Copy `/src/types.ts` to `oru-ph-nextjs/src/types.ts`
4. Copy `/src/firebase.ts` to `oru-ph-nextjs/src/firebase.ts`

---

## 🖥️ Step 4: Configure the Next.js Main Entry Page
Open `/src/app/page.tsx` in your Next.js project, and set up your client routing component. Since our application controls its view state natively, add the `'use client'` directive at the top of the file:

```tsx
'use client';

import React from 'react';
import App from '@/components/App';

export default function Home() {
  return <App />;
}
```
*(If you want to move the component out of the root, you can place the App container layout inside `src/components/App.tsx` and export it directly there!)*

---

## 📦 Step 5: Install Required React Dependencies
Run the following package installers inside your Next.js folder:
```bash
npm install lucide-react motion firebase
```

---

## 💼 Step 6: Environmental Variables (Firebase)
Create a `.env.local` inside your Next.js project directory to hold any required client or server environment configurations securely:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
```

All your files are fully prepared and structured to provide a fast and secure loading experience!
