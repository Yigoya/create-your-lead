
import { useEffect, useState } from "react";

type CursorPosition = {
  x: number;
  y: number;
};

const AnimatedCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", () => setHidden(true));
    window.addEventListener("mouseenter", () => setHidden(false));
    handleLinkHoverEvents();

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", () => setHidden(true));
      window.removeEventListener("mouseenter", () => setHidden(false));
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", () => setLinkHovered(true));
        el.removeEventListener("mouseleave", () => setLinkHovered(false));
      });
    };
  }, []);

  return (
    <>
      <div
        className={`cursor-dot ${hidden ? "opacity-0" : "opacity-100"} ${
          clicked ? "scale-75" : "scale-100"
        } ${linkHovered ? "scale-150" : "scale-100"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        className={`cursor-ring ${hidden ? "opacity-0" : "opacity-100"} ${
          clicked ? "scale-75" : "scale-100"
        } ${linkHovered ? "scale-150" : "scale-100"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

export default AnimatedCursor;
