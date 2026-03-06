"use client";

import { useState, useCallback } from "react";
import { Send, Loader2, CornerDownLeft } from "lucide-react";
import { useAutoResizeTextarea } from "@/components/hooks/use-auto-resize-textarea";
import { cn } from "@/lib/utils";

interface AIInputProps {
  onSubmit: (value: string) => Promise<void>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function AIInputWithLoading({
  onSubmit,
  placeholder = "Ask me anything about the Central Valley market...",
  disabled = false,
  className,
}: AIInputProps) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea(200);

  const handleSubmit = useCallback(async () => {
    const trimmed = value.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    try {
      await onSubmit(trimmed);
      setValue("");
      adjustHeight(true);
    } finally {
      setLoading(false);
    }
  }, [value, loading, onSubmit, adjustHeight]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative rounded-xl border border-white/20 md:border-white/10 bg-neutral-950/80 backdrop-blur-sm will-change-transform overflow-hidden transition-colors focus-within:border-[#C5A059]/50">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            adjustHeight();
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || loading}
          rows={1}
          style={{ fontSize: "16px" }}
          className="w-full resize-none bg-transparent px-4 pt-4 pb-14 text-sm text-white placeholder:text-white/30 focus:outline-none disabled:opacity-50"
        />

        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-1 text-[10px] text-white/20">
            <CornerDownLeft className="h-3 w-3" />
            Enter
          </span>
          <button
            onClick={handleSubmit}
            disabled={!value.trim() || loading || disabled}
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#C5A059] text-black transition-all hover:bg-[#d4b068] disabled:opacity-30 disabled:hover:bg-[#C5A059]"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
