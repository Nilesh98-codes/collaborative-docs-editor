"use client";

import { useState, useEffect, useCallback } from "react";
import { PlayIcon, PauseIcon, RotateCcwIcon, CoffeeIcon, TimerIcon, Minimize2Icon, Maximize2Icon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(mode === "work" ? WORK_TIME : BREAK_TIME);
  }, [mode]);

  const switchMode = useCallback((newMode: "work" | "break") => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(newMode === "work" ? WORK_TIME : BREAK_TIME);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      const nextMode = mode === "work" ? "break" : "work";
      toast.success(
        mode === "work"
          ? "Time for a break! Great job."
          : "Break is over! Back to work."
      );
      switchMode(nextMode);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode, switchMode]);

  if (!isVisible) {
    return (
      <div className="fixed bottom-6 right-6 z-40 print:hidden hidden md:block">
        <button
          onClick={() => setIsVisible(true)}
          className="flex items-center gap-2 p-3 bg-[#F1F4F9] border-none rounded-full shadow-md hover:bg-neutral-200/80 transition-all group"
          title="Show Pomodoro Timer"
        >
          <div className="relative flex h-5 w-5 items-center justify-center">
            {isActive && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-75"></span>
            )}
            <TimerIcon className="size-5 text-neutral-700 relative" />
          </div>
        </button>
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progress =
    100 -
    (timeLeft / (mode === "work" ? WORK_TIME : BREAK_TIME)) * 100;

  return (
    <div className="fixed bottom-6 right-6 z-40 print:hidden hidden md:flex flex-col animate-in slide-in-from-bottom-4 fade-in-50">
      <div className="bg-[#F1F4F9] shadow-xl rounded-[24px] overflow-hidden w-64 transition-all duration-300 border border-neutral-200/60 p-1">
        {/* Header */}
        <div className="px-4 py-2 flex items-center justify-between border-b border-neutral-200/50">
          <div className="flex items-center gap-2">
            {mode === "work" ? (
              <TimerIcon className="size-4 text-primary" />
            ) : (
              <CoffeeIcon className="size-4 text-blue-500" />
            )}
            <span className="font-semibold text-xs text-neutral-700 uppercase tracking-wider">
              {mode === "work" ? "Focus" : "Break"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200 rounded-sm transition-colors"
            >
              {isMinimized ? (
                <Maximize2Icon className="size-3.5" />
              ) : (
                <Minimize2Icon className="size-3.5" />
              )}
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200 rounded-sm transition-colors"
            >
              <XIcon className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-neutral-100 w-full">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              mode === "work" ? "bg-red-500" : "bg-blue-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Timer Body */}
        {!isMinimized && (
          <div className="p-4 flex flex-col items-center gap-4">
            <div
              className={`text-5xl font-bold font-mono tracking-tighter ${
                mode === "work" ? "text-neutral-800" : "text-blue-600"
              }`}
            >
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={mode === "work" ? "default" : "secondary"}
                size="sm"
                className={`text-xs h-7 px-3 rounded-full ${
                  mode === "work"
                    ? "bg-white hover:bg-neutral-50 text-neutral-800 shadow-sm font-medium border border-neutral-200"
                    : "bg-transparent text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200/50"
                }`}
                onClick={() => switchMode("work")}
              >
                Focus
              </Button>
              <Button
                variant={mode === "break" ? "default" : "secondary"}
                size="sm"
                className={`text-xs h-7 px-3 rounded-full ${
                  mode === "break"
                    ? "bg-white hover:bg-neutral-50 text-blue-600 shadow-sm font-medium border border-neutral-200"
                    : "bg-transparent text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200/50"
                }`}
                onClick={() => switchMode("break")}
              >
                Break
              </Button>
            </div>

            <div className="flex items-center gap-2 w-full pt-2">
              <Button
                variant={isActive ? "secondary" : "default"}
                className={`flex-1 rounded-full h-9 ${
                  !isActive
                    ? mode === "work"
                      ? "bg-neutral-800 hover:bg-neutral-900 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200"
                }`}
                onClick={toggleTimer}
              >
                {isActive ? (
                  <>
                    <PauseIcon className="size-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <PlayIcon className="size-4 mr-2" />
                    Start
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9 bg-white hover:bg-neutral-50 border-neutral-200"
                onClick={resetTimer}
                title="Reset Timer"
              >
                <RotateCcwIcon className="size-4 text-neutral-600" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
