<div align="center">

# ✨ NoteSync

### A collaborative document editor with AI-powered writing tools

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-API-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br />

<p align="center">
  <strong>Real-time collaboration</strong> · <strong>AI Writing Assistant</strong> · <strong>OCR Text Extraction</strong> · <strong>Rich Text Editing</strong>
</p>

<br />

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Credits](#-credits)

---

## 🚀 Features

### 📝 Rich Collaborative Document Editing
- **Real-time collaboration** — Multiple users can edit the same document simultaneously with live cursors and presence indicators powered by [Liveblocks](https://liveblocks.io/)
- **Threaded comments** — Leave inline comments, start discussion threads, and resolve conversations directly within the document
- **Notification inbox** — Real-time bell notifications for comment replies and mentions
- **Live cursor avatars** — See who's editing and where they are in the document in real-time

### 🤖 AI Writing Assistant
- **Contextual AI actions** — Select any text and get an inline floating AI button with quick actions:
  - ✍️ *Improve writing* — Enhance clarity and professionalism
  - 🔄 *Rewrite* — Rephrase while preserving meaning
  - 📝 *Summarize* — Condense into key points
  - ✂️ *Make shorter* — Trim while keeping essentials
  - 📖 *Make longer* — Expand with relevant detail
- **Preview & edit** — Review AI suggestions side-by-side with the original before replacing

### 💬 AI Chat Assistant
- **Conversational sidebar** — Chat with an AI assistant that understands your document's context
- **Document-aware responses** — The assistant reads your document content to provide relevant answers
- **Quick suggestions** — One-click prompts like "Summarize this document", "Suggest improvements", and "Improve grammar"
- **Markdown rendering** — AI responses are beautifully formatted with lists, code blocks, and headings
- **Responsive layout** — Full-screen drawer on mobile, inline sidebar on desktop

### 🔍 OCR — Text Extraction
- **Image OCR** — Upload PNG, JPG, or WebP images and extract text using [Tesseract.js](https://tesseract.js.org/)
- **PDF OCR** — Extract text from multi-page PDF documents with page-by-page progress tracking via [pdfjs-dist](https://mozilla.github.io/pdf.js/)
- **Review & edit** — Preview extracted text in a dialog before inserting into the document

### ⏱️ Pomodoro Timer
- **Built-in focus timer** — 25-minute work / 5-minute break Pomodoro cycles
- **Minimizable widget** — Floating timer in the bottom-right corner that can be minimized or hidden
- **Visual progress** — Progress bar and animated pulse indicator when the timer is active
- **Smart notifications** — Toast alerts when sessions end with automatic mode switching

### 🔧 Editor Power Features
- **Rich text formatting** — Bold, italic, underline, strikethrough, headings (H1–H5), and more
- **Font customization** — 18 font families including Google Fonts (Inter, Roboto, Poppins, Montserrat)
- **Adjustable font size** — Increment/decrement with manual input
- **Text & highlight colors** — Full color picker for text and background highlighting
- **Text alignment** — Left, center, right, and justify
- **Line height control** — Default, single, 1.15, 1.5, and double spacing
- **Lists** — Bullet lists, ordered lists, and interactive task/todo lists
- **Tables** — Insertable tables with headers (1×1 to 4×4)
- **Images** — Upload or paste URL with drag-to-resize support
- **Links** — Insert and edit hyperlinks
- **Adjustable margins** — Drag ruler to customize left/right page margins (synced in real-time)
- **Spell check toggle** — Enable/disable browser spellcheck
- **Print support** — Print-optimized layout with `Ctrl+P`
- **Export formats** — Save as JSON, HTML, PDF, or plain text

### 📄 Document Management
- **Template gallery** — Start new documents from pre-built templates via a carousel picker
- **Document search** — Search through your documents by title
- **Rename & delete** — Manage documents with inline rename and remove dialogs
- **Organization support** — Shared workspaces via Clerk organizations

### 🔐 Authentication & Security
- **Clerk authentication** — Secure sign-in/sign-up with organization switching
- **Role-based access** — Document ownership and organization membership checks
- **Protected API routes** — Server-side authentication for all Convex mutations

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat-square&logo=next.js) ![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| **Editor** | ![Tiptap](https://img.shields.io/badge/Tiptap-1a1a2e?style=flat-square) with 16+ extensions (StarterKit, Table, TaskList, Image Resize, etc.) |
| **Real-time** | ![Liveblocks](https://img.shields.io/badge/Liveblocks-6366F1?style=flat-square) (collaboration, cursors, threads, comments, notifications) |
| **Backend** | ![Convex](https://img.shields.io/badge/Convex-F97316?style=flat-square) (serverless database, mutations, queries) |
| **AI** | ![Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=flat-square&logo=google&logoColor=white) (`@google/generative-ai`) |
| **Auth** | ![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white) (authentication, organizations) |
| **OCR** | ![Tesseract.js](https://img.shields.io/badge/Tesseract.js_7-blue?style=flat-square) · ![pdfjs](https://img.shields.io/badge/pdfjs--dist-red?style=flat-square) |
| **State** | ![Zustand](https://img.shields.io/badge/Zustand_5-443E38?style=flat-square) |
| **Styling** | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) · ![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=flat-square) · ![Lucide](https://img.shields.io/badge/Lucide_Icons-F56565?style=flat-square) |
| **Utilities** | `date-fns` · `nuqs` (URL search params) · `sonner` (toasts) · `react-markdown` · `embla-carousel-react` |

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (or yarn / pnpm)
- A [Clerk](https://clerk.com/) account (for authentication)
- A [Convex](https://www.convex.dev/) project (for the database)
- A [Liveblocks](https://liveblocks.io/) account (for real-time collaboration)
- A [Google AI Studio](https://aistudio.google.com/) API key (for Gemini AI features)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Nilesh98-codes/collaborative-docs-editor.git
cd collaborative-docs-editor

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.local.example .env.local
# Then fill in your keys (see Environment Variables section below)

# 4. Start the Convex dev server (in a separate terminal)
npx convex dev

# 5. Start the development server
npm run dev
```

The app will be running at **http://localhost:3000** 🎉

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Convex
CONVEX_DEPLOYMENT=your_convex_deployment
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Liveblocks (Real-time collaboration)
LIVEBLOCKS_SECRET_KEY=sk_dev_xxxxx

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

---

## 📁 Project Structure

```
note-sync/
├── convex/                     # Convex backend
│   ├── schema.ts               #   Database schema
│   ├── documents.ts            #   Document CRUD mutations & queries
│   └── auth.config.ts          #   Authentication config
│
├── src/
│   ├── app/
│   │   ├── (home)/             # Dashboard / landing page
│   │   │   ├── page.tsx        #   Home page with document list
│   │   │   ├── template-gallery.tsx  #   New document templates
│   │   │   ├── documents-table.tsx   #   Document list table
│   │   │   └── search-input.tsx      #   Search bar
│   │   │
│   │   ├── documents/[documentId]/   # Document editor page
│   │   │   ├── editor.tsx      #   Tiptap editor setup
│   │   │   ├── toolbar.tsx     #   Formatting toolbar + OCR
│   │   │   ├── navbar.tsx      #   Top nav (file menu, avatars)
│   │   │   ├── ai-writing-assistant.tsx  #   Floating AI text actions
│   │   │   ├── ai-chat-panel.tsx   #   AI chat sidebar
│   │   │   ├── pomodoro-timer.tsx  #   Focus timer widget
│   │   │   ├── threads.tsx     #   Comment threads
│   │   │   ├── inbox.tsx       #   Notification inbox
│   │   │   ├── ruler.tsx       #   Draggable margin ruler
│   │   │   └── avatars.tsx     #   Collaborator presence
│   │   │
│   │   └── api/
│   │       ├── gemini/         #   AI writing assistant API route
│   │       ├── gemini-chat/    #   AI chat API route
│   │       └── liveblocks-auth/#   Liveblocks auth endpoint
│   │
│   ├── components/             # Shared components
│   │   ├── ui/                 #   Radix-based UI primitives
│   │   ├── rename-dialog.tsx   #   Document rename modal
│   │   └── remove-dialog.tsx   #   Document delete confirmation
│   │
│   ├── store/                  # Zustand state stores
│   │   ├── use-editor-store.ts #   Editor instance state
│   │   └── use-chat-store.ts   #   AI chat panel state
│   │
│   ├── extensions/             # Custom Tiptap extensions
│   │   ├── font-size.ts        #   Font size control
│   │   └── line-height.ts      #   Line height control
│   │
│   ├── hooks/                  # Custom React hooks
│   ├── constants/              # App constants & templates
│   └── lib/                    # Utilities (Gemini client, cn helper)
│
├── public/                     # Static assets & workers
├── liveblocks.config.ts        # Liveblocks type definitions
└── package.json
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## 🙏 Credits

<div align="center">

**Built with ❤️ by Ken**

</div>

---

<div align="center">
  <sub>If you found this project useful, consider giving it a ⭐</sub>
</div>
