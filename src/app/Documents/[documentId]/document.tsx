"use client";

import { useEffect } from "react";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { useRouter } from "next/navigation";

import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";
import { Room } from "./room"
import { AIWritingAssistant } from "./ai-writing-assistant"
import { PomodoroTimer } from "./pomodoro-timer"
import { api } from "../../../../convex/_generated/api";

interface DocumentProps {
    preloadedDocument: Preloaded<typeof api.documents.getById>;
};

export const Document = ({ preloadedDocument }: DocumentProps) => {
    const router = useRouter();
    const document = usePreloadedQuery(preloadedDocument);

    useEffect(() => {
        if (!document) {
            router.push("/");
        }
    }, [document, router]);

    if (!document) return null;

    return (
        <Room>
            <div className="min-h-screen bg-[#FAFAF9]">
                <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-white/60 backdrop-blur-xl border-b border-indigo-100/30 shadow-[0_1px_3px_0_rgba(99,102,241,0.04)] print:hidden">
                    <Navbar data={document}/>
                    <Toolbar />
                </div>
                <div className="pt-[114px] print:pt-0 relative">
                    <Editor initialContent={document.initialContent}/>
                    <AIWritingAssistant />
                    <PomodoroTimer />
                </div>
            </div>
        </Room>
    );
}