import { useCallback, useRef } from "react";

export function useAutoResizeTextarea(maxHeight: number = 200) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = "auto";
        return;
      }

      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;
    },
    [maxHeight]
  );

  return { textareaRef, adjustHeight };
}
