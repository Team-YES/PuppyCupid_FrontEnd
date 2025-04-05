import { useEffect } from "react";

type Handler = () => void;

export const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  handler: Handler
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      // ref가 존재하고 클릭한 곳이 ref 내부가 아니라면 handler 실행
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};
