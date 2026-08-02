"use client";

import { useState } from "react";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import {
  FileText,
  Users,
  Sparkles,
  ScanText,
  Timer,
  Cloud,
  Github,
  Menu,
  X,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

/* ────────────────────────────── Data ────────────────────────────── */

const GITHUB_URL = "https://github.com/Nilesh98-codes";
const PORTFOLIO_URL = "https://nilesh-chidambaram.vercel.app/";

const heroFeatures = [
  {
    icon: FileText,
    title: "Rich Text Editor",
    description:
      "Full-featured document editing powered by TipTap — formatting, tables, images, task lists, and more.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description:
      "Work together simultaneously with live cursors, presence indicators, and instant sync via Liveblocks.",
    gradient: "from-indigo-500 to-violet-500",
  },
];

const standardFeatures = [
  {
    icon: Sparkles,
    title: "AI Writing Assistant",
    description:
      "Intelligent writing suggestions, summaries, and content generation powered by the Gemini API.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: ScanText,
    title: "OCR Text Extraction",
    description:
      "Extract text from images and PDFs seamlessly — paste or upload and let OCR do the rest.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Timer,
    title: "Pomodoro Timer",
    description:
      "Stay focused with a built-in Pomodoro timer to manage your writing and study sessions.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description:
      "Documents stored securely in the cloud with Convex — access them from anywhere, anytime.",
    gradient: "from-rose-500 to-orange-500",
  },
];

const screenshots = [
  {
    src: "/screenshots/dashboard.png",
    alt: "NoteSync dashboard showing template gallery and document list with search",
    title: "Dashboard",
    description: "Templates, search, and all your documents in one place.",
  },
  {
    src: "/screenshots/editor.png",
    alt: "NoteSync rich text editor with Pomodoro focus timer running",
    title: "Editor & Focus Mode",
    description: "Distraction-free writing with a built-in Pomodoro timer.",
  },
  {
    src: "/screenshots/ai-assistant.png",
    alt: "NoteSync AI Assistant panel showing suggestion prompts for the current document",
    title: "AI Assistant",
    description: "Ask questions, summarize, or improve your writing with AI.",
  },
  {
    src: "/screenshots/ocr.png",
    alt: "NoteSync OCR feature extracting text from a scanned image for review",
    title: "OCR Extraction",
    description: "Paste an image and extract editable text instantly.",
  },
];

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Convex",
  "Clerk",
  "Liveblocks",
  "Gemini API",
  "pdfjs-dist",
  "Tesseract.js",
];

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "GitHub", href: GITHUB_URL, external: true },
];

/* Shared inline font style — Montserrat is loaded as a CSS var in root layout */
const montserratFont: React.CSSProperties = {
  fontFamily: "var(--font-montserrat), sans-serif",
};

/* ────────────────────────────── Component ────────────────────────────── */

export const LandingPage = () => {
  const { openSignIn } = useClerk();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    openSignIn({ redirectUrl: "/" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] overflow-x-hidden">
      {/* ═══════════ Section 1: Sticky Navigation ═══════════ */}
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-indigo-100/40 shadow-[0_1px_3px_0_rgba(99,102,241,0.04)]"
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg">
              <Image src="/logo.svg" alt="" width={36} height={36} aria-hidden="true" />
              <span
                className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
                style={montserratFont}
              >
                NoteSync
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 py-0.5"
                >
                  {link.label}
                  {link.external && <ExternalLink className="size-3" />}
                </a>
              ))}
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md shadow-indigo-200/50 hover:shadow-lg hover:shadow-indigo-300/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 min-h-[44px]"
              >
                Get Started
                <ArrowRight className="size-4" />
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 -mr-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden border-t border-indigo-100/40 bg-white/95 backdrop-blur-xl"
            role="menu"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors py-3 px-3 rounded-lg min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  role="menuitem"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleGetStarted();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md shadow-indigo-200/50 min-h-[44px] mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                role="menuitem"
              >
                Get Started
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* ═══════════ Section 2: Hero (asymmetric split) ═══════════ */}
        <section
          aria-label="Hero"
          className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8"
          style={{
            backgroundImage:
              "radial-gradient(circle, #e5e5e5 0.8px, transparent 0.8px)",
            backgroundSize: "24px 24px",
          }}
        >
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Left column — text */}
              <div className="lg:w-[55%] text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200/60 bg-indigo-50/50 text-indigo-600 text-xs font-medium mb-8">
                  <Sparkles className="size-3.5" />
                  Real-time collaborative document editor
                </div>

                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.08]"
                  style={montserratFont}
                >
                  Collaborate Smarter.{" "}
                  <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                    Write Better.
                  </span>
                </h1>

                <p className="mt-6 lg:mt-8 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Real-time collaboration, AI-powered writing assistance, OCR
                  text extraction, and seamless cloud sync — all in one
                  beautiful editor.
                </p>

                <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-center lg:items-start gap-4">
                  <button
                    onClick={handleGetStarted}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    Get Started — it&apos;s free
                    <ArrowRight className="size-5" />
                  </button>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-foreground border border-border bg-white hover:bg-accent hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-sm min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    <Github className="size-5" />
                    View GitHub
                  </a>
                </div>
              </div>

              {/* Right column — dashboard screenshot */}
              <div className="lg:w-[45%] w-full max-w-lg lg:max-w-none">
                <div className="relative rotate-1 sm:rotate-2">
                  <div className="rounded-2xl overflow-hidden border border-border/60 shadow-2xl shadow-indigo-200/30 bg-white">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src="/screenshots/dashboard.png"
                        alt="NoteSync dashboard showing template gallery and document list with search"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ Section 3: Feature Grid (bento) ═══════════ */}
        <section
          id="features"
          aria-labelledby="features-heading"
          className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white/80 to-[#FAFAF9]"
        >
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-14 lg:mb-20">
              <h2
                id="features-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
                style={montserratFont}
              >
                Everything you need to{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  write &amp; collaborate
                </span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
                Powerful features designed for modern teams and individual
                writers alike.
              </p>
            </div>

            {/* Hero feature cards — 2 large */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {heroFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative p-8 lg:p-10 rounded-2xl border border-border/60 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  <div
                    className={`inline-flex items-center justify-center size-14 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-md mb-5 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
                    <feature.icon className="size-7 relative z-10 text-white" />
                  </div>
                  <h3
                    className="text-xl font-bold text-foreground mb-3"
                    style={montserratFont}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-indigo-200/60" />
                </div>
              ))}
            </div>

            {/* Standard feature cards — 4 smaller */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {standardFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative p-6 rounded-2xl border border-border/60 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  <div
                    className={`inline-flex items-center justify-center size-11 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-md mb-4 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
                    <feature.icon className="size-5 relative z-10 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-indigo-200/60" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ Section 4: Screenshots Showcase ═══════════ */}
        <section
          id="screenshots"
          aria-labelledby="screenshots-heading"
          className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAFAF9] to-white/80"
        >
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-14 lg:mb-20">
              <h2
                id="screenshots-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
                style={montserratFont}
              >
                See it in{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  action
                </span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
                A glimpse at what you&apos;ll be working with every day.
              </p>
            </div>

            {/* Staggered 2-column grid on desktop, single-column on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {screenshots.map((shot, i) => (
                <div
                  key={shot.title}
                  className={`group ${
                    i % 2 === 1 ? "md:mt-12" : ""
                  }`}
                >
                  <div className="rounded-2xl overflow-hidden border border-border/60 bg-white shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300">
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="mt-4 px-1">
                    <h3 className="text-base font-semibold text-foreground">
                      {shot.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {shot.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ Section 5: Tech Stack Badges ═══════════ */}
        <section
          id="tech-stack"
          aria-labelledby="tech-stack-heading"
          className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white/80 to-[#FAFAF9]"
        >
          <div className="max-w-screen-xl mx-auto text-center">
            <h2
              id="tech-stack-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
              style={montserratFont}
            >
              Built with modern tech
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-12 lg:mb-16">
              A carefully curated stack for performance, scalability, and
              developer experience.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2.5 rounded-full text-sm font-medium bg-indigo-50/80 text-indigo-700 border border-indigo-100/60 hover:bg-indigo-100/80 hover:border-indigo-200/80 transition-colors duration-200 min-h-[40px] flex items-center"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ Section 6: Why NoteSync ═══════════ */}
        <section
          aria-labelledby="why-heading"
          className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAFAF9] to-white/80"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2
              id="why-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8"
              style={montserratFont}
            >
              Why NoteSync?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Traditional document editors force you to choose between powerful
              features and real-time collaboration. NoteSync brings both
              together in a single, elegant interface. Whether you&apos;re
              drafting a research paper, collaborating on meeting notes, or
              extracting text from scanned documents, NoteSync adapts to your
              workflow — not the other way around. With AI-powered writing
              assistance baked in, you&apos;ll spend less time formatting and
              more time creating.
            </p>
          </div>
        </section>

        {/* ═══════════ Section 7: CTA ═══════════ */}
        <section
          aria-label="Call to action"
          className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-screen-xl mx-auto">
            <div className="cta-shimmer relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 px-6 py-14 sm:px-16 sm:py-20 text-center shadow-2xl shadow-indigo-300/30">
              <div className="relative z-10">
                <h2
                  className="text-3xl sm:text-4xl font-bold text-white mb-4"
                  style={montserratFont}
                >
                  Ready to start collaborating?
                </h2>
                <p className="text-base sm:text-lg text-indigo-100 max-w-xl mx-auto mb-10">
                  Join NoteSync and experience the future of collaborative
                  writing — free to get started.
                </p>
                <button
                  onClick={handleGetStarted}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold text-indigo-600 bg-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                >
                  Get Started
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════ Section 8: Footer ═══════════ */}
      <footer
        aria-label="Site footer"
        className="py-10 px-4 sm:px-6 lg:px-8 border-t border-border/40"
      >
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="" width={28} height={28} aria-hidden="true" />
            <span
              className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"
              style={montserratFont}
            >
              NoteSync
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1.5 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded min-h-[44px]"
            >
              <Github className="size-4" />
              GitHub
            </a>
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded min-h-[44px] flex items-center"
            >
              Portfolio
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} NoteSync. All rights reserved.
          </p>
        </div>
      </footer>

      {/* CTA shimmer animation — CSS only */}
      <style jsx>{`
        .cta-shimmer::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.08),
            transparent
          );
          animation: shimmer 4s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          50% {
            left: 150%;
          }
          100% {
            left: 150%;
          }
        }
      `}</style>
    </div>
  );
};
