<div align="center">

# 📝 NoteSync

**A modern, distraction-free document editor — built for students and professionals who want more than just a text box.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Educational-green?style=flat-square)](#license)

[Features](#-features) · [Tech Stack](#️-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure) · [Roadmap](#-roadmap)

</div>

---

## ✨ Overview

NoteSync is a full-stack document editor that goes beyond the basics. It combines rich text editing with productivity tools — OCR, a Pomodoro timer, and an AI writing assistant — all in a clean, minimal interface that doesn't look like a Google Docs clone.

> Built as a personal project by **Ken William** to explore modern web development patterns with Next.js App Router.

---

## 🚀 Features

### ✍️ Rich Text Editor
- Create, edit, and manage multiple documents
- Tiptap-powered editor with full formatting support
- Clean, distraction-free writing experience
- Unique design — not a Google Docs replica

### 📷 OCR (Optical Character Recognition)
- Upload an image and extract text directly into your document
- Supports handwritten and printed content
- Powered by Tesseract.js

### ⏳ Pomodoro Timer
- Built-in focus timer to manage your work sessions
- Configurable work/break intervals
- Stays out of the way while you write

### 🤖 AI Writing Assistant
- Select any text and apply AI-powered actions:
  - Improve writing
  - Rewrite
  - Summarize
  - Make shorter / Make longer
- Powered by the **Anthropic Claude API** (claude-haiku)
- Results shown in a preview dialog before applying

### 🎨 Modern UI/UX
- Off-white warm background (`#F9F9F7`) — easy on the eyes
- Inter font, soft shadows, and rounded corners throughout
- Frosted glass navbar, floating document cards
- Custom violet accent color replacing Google-blue

### 📁 Document Management
- Create, save, and manage multiple documents
- Document list on the home page with card-based layout
- Each document has its own editor route

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Editor | Tiptap (ProseMirror) |
| AI | Anthropic Claude API |
| OCR | Tesseract.js |
| State | Zustand |
| Realtime / Storage | Liveblocks / Convex *(update as needed)* |
| Deployment | Vercel |

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- An [Gemini API key](https://aistudio.google.com/) for the AI assistant

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Nilesh98-codes/collaborative-docs-editor
cd notesync

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
```

Add your keys to `.env.local`:

```env
GEMINI_API_KEY=Ai----
NEXT_PUBLIC_CONVEX_URL = 
LIVEBLOCKS_SECRET_KEY = sk..
```

```bash
# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---


## 🧠 How It Works

1. **Home page** lists all your saved documents as cards. Click one to open it, or create a new one.
2. **Editor page** loads the Tiptap editor with a full toolbar. Select any text to trigger the floating AI button.
3. **AI assistant** sends your selected text to `/api/ai` (a server-side proxy), which calls the Claude API and returns the result in a preview dialog.
4. **OCR module** lets you upload an image — Tesseract.js processes it and inserts the extracted text into the editor at your cursor.
5. **Pomodoro timer** runs as a floating widget, independent of the editor state.

---

## 🗺️ Roadmap

- [x] Rich text editor with Tiptap
- [x] OCR with Tesseract.js
- [x] Pomodoro timer
- [x] AI writing assistant (Claude API)
- [x] Modern UI redesign
- [ ] Cloud document storage
- [ ] Real-time collaboration
- [ ] Export as PDF / Word
- [ ] Mobile-responsive editor

---

## 📸 Screenshots

> *(--Placeholder--)*

---

## 🚀 Deployment

Deploy instantly on [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Make sure to add your environment variables in the Vercel project settings.

---

## 🤝 Contributing

This is a personal project, but suggestions and PRs are welcome!

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push and open a pull request

---

## 📄 License

Built for educational purposes. Feel free to learn from it.

---

<div align="center">

Made by **Nilesh Chidambaram**

*Star the repo if you found it useful ⭐*

</div>
