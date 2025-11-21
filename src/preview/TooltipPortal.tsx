import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipPortalProps {
  children: React.ReactNode;
  target?: HTMLElement | null;
}

export default function TooltipPortal({ children }: TooltipPortalProps) {
  const [el, setEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.left = "0";
    div.style.width = "100%";
    div.style.height = "0";
    div.style.pointerEvents = "none"; // so it won't block mouse
    document.body.appendChild(div);
    setEl(div);

    return () => {
      document.body.removeChild(div);
    };
  }, []);

  if (!el) return null;
  return createPortal(children, el);
}
