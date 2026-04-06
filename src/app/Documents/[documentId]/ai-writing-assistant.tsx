"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { SparklesIcon, Loader2Icon, XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/use-editor-store";
import { generateAIContent } from "@/lib/gemini";
import { toast } from "sonner";

const AI_ACTIONS = [
  {
    label: "Improve writing",
    prompt:
      "Improve the writing quality of the following text. Make it clearer, more professional, and better structured. Return ONLY the improved text, no explanations:\n\n",
  },
  {
    label: "Rewrite",
    prompt:
      "Rewrite the following text in a different way while keeping the same meaning. Return ONLY the rewritten text, no explanations:\n\n",
  },
  {
    label: "Summarize",
    prompt:
      "Summarize the following text concisely. Return ONLY the summary, no explanations:\n\n",
  },
  {
    label: "Make shorter",
    prompt:
      "Make the following text shorter and more concise while keeping the key information. Return ONLY the shortened text, no explanations:\n\n",
  },
  {
    label: "Make longer",
    prompt:
      "Expand the following text with more detail and depth while keeping it relevant. Return ONLY the expanded text, no explanations:\n\n",
  },
] as const;

export const AIWritingAssistant = () => {
  const { editor } = useEditorStore();
  const [showFloating, setShowFloating] = useState(false);
  const [floatingPos, setFloatingPos] = useState({ top: 0, left: 0 });
  const [showActions, setShowActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewText, setPreviewText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [activeAction, setActiveAction] = useState("");
  const floatingRef = useRef<HTMLDivElement>(null);
  const selectionRangeRef = useRef<{ from: number; to: number } | null>(null);

  const updateFloatingPosition = useCallback(() => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, " ");

    if (text.trim().length > 0) {
      // Get the DOM coordinates of the selection end
      const endCoords = editor.view.coordsAtPos(to);
      const editorDom = editor.view.dom;
      const editorRect = editorDom.getBoundingClientRect();

      // Position the button below and to the right of the selection
      const top = endCoords.bottom - editorRect.top + 8;
      const left = endCoords.left - editorRect.left;

      setFloatingPos({ top, left: Math.max(0, Math.min(left, editorRect.width - 40)) });
      setSelectedText(text.trim());
      selectionRangeRef.current = { from, to };
      setShowFloating(true);
    } else {
      setShowFloating(false);
      setShowActions(false);
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      // Small delay to avoid flickering during active selection
      requestAnimationFrame(() => {
        updateFloatingPosition();
      });
    };

    editor.on("selectionUpdate", handleSelectionUpdate);

    // Also hide when editor loses focus (with a delay to allow clicking the floating button)
    const handleBlur = () => {
      setTimeout(() => {
        const activeEl = document.activeElement;
        if (
          floatingRef.current &&
          !floatingRef.current.contains(activeEl)
        ) {
          // Don't hide if dialog is open
          if (!showPreview && !showActions) {
            setShowFloating(false);
            setShowActions(false);
          }
        }
      }, 200);
    };

    editor.on("blur", handleBlur);

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate);
      editor.off("blur", handleBlur);
    };
  }, [editor, updateFloatingPosition, showPreview, showActions]);

  const handleAction = async (action: (typeof AI_ACTIONS)[number]) => {
    
    if (!selectedText) return;

    setActiveAction(action.label);
    setShowActions(false);
    setIsLoading(true);
    setShowPreview(true);
    setPreviewText("");

    try {
  const result = await generateAIContent(
    `${action.prompt}${selectedText}`
  );
  setPreviewText(result);
} catch (error) {
  let message = "Failed to generate AI content. Please try again.";

  if (error instanceof Error) {
    const msg = error.message.toLowerCase();

    if (
      msg.includes("quota") ||
      msg.includes("rate limit") ||
      msg.includes("429")
    ) {
      message =
        "AI assistant quota exceeded. Please try again later.";
    } else {
      message = error.message;
    }
  }

  toast.error(message);

  // avoid scary red error overlay in dev
  if (process.env.NODE_ENV === "development") {
    console.warn("AI generation error:", error);
  }

  setShowPreview(false);
} finally {
  setIsLoading(false);
}}

  const handleReplace = () => {
    if (!editor || !previewText || !selectionRangeRef.current) return;

    const { from, to } = selectionRangeRef.current;

    editor
      .chain()
      .focus()
      .deleteRange({ from, to })
      .insertContentAt(from, previewText)
      .run();

    toast.success("Text replaced with AI content.");
    handleClose();
  };

  const handleClose = () => {
    setShowPreview(false);
    setPreviewText("");
    setActiveAction("");
    setShowFloating(false);
    setShowActions(false);
  };

  if (!editor) return null;

  return (
    <>
      {/* Floating AI button — positioned relative to the editor DOM */}
      {showFloating && (
        <div
          ref={floatingRef}
          className="absolute z-20 print:hidden"
          style={{
            top: floatingPos.top,
            left: floatingPos.left,
          }}
          // Mount inside the editor scroll container
          // We use a portal-like approach by positioning absolute within the editor wrapper
        >
          {!showActions ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowActions(true);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-white border border-neutral-200 rounded-sm shadow-md hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-150"
              title="AI Writing Assistant"
            >
              <SparklesIcon className="size-3.5 text-violet-500" />
              <span className="text-neutral-700">AI</span>
            </button>
          ) : (
            <div className="flex flex-col bg-white border border-neutral-200 rounded-sm shadow-lg overflow-hidden min-w-[160px] animate-in fade-in-0 zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-neutral-100 bg-neutral-50">
                <span className="text-xs font-medium text-neutral-500 flex items-center gap-1.5">
                  <SparklesIcon className="size-3 text-violet-500" />
                  AI Actions
                </span>
                <button
                  onClick={() => setShowActions(false)}
                  className="text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <XIcon className="size-3.5" />
                </button>
              </div>
              {AI_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAction(action);
                  }}
                  className="px-3 py-2 text-xs text-left text-neutral-700 hover:bg-neutral-100 transition-colors border-b border-neutral-50 last:border-b-0"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={(open) => { if (!open) handleClose(); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-sm">
              <SparklesIcon className="size-4 text-violet-500" />
              {activeAction}
            </DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <Loader2Icon className="size-6 text-violet-500 animate-spin" />
                <span className="text-sm text-neutral-500">Generating…</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs text-neutral-500 font-medium">Original</div>
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm text-sm text-neutral-600 max-h-24 overflow-y-auto">
                {selectedText}
              </div>
              <div className="text-xs text-neutral-500 font-medium">AI Result</div>
              <textarea
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                className="w-full h-40 p-3 border border-neutral-200 rounded-sm text-sm resize-y focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 bg-white"
                placeholder="AI generated text will appear here…"
              />
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReplace}
              disabled={isLoading || !previewText}
              className="text-xs bg-violet-600 hover:bg-violet-700 text-white"
            >
              Replace
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
