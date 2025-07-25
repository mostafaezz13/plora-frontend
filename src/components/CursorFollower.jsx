import React, { useEffect, useRef, useState } from "react";

const CursorFollower = () => {
  const cursorRef = useRef(null);

  const mousePosition = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });

  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;

    const smoothFactor = 0.12;

    let animationFrameId;

    const updateCursor = () => {
      const dx = mousePosition.current.x - position.current.x;
      const dy = mousePosition.current.y - position.current.y;

      position.current.x += dx * smoothFactor;
      position.current.y += dy * smoothFactor;

      if (cursor) {
        cursor.style.left = `${position.current.x}px`;
        cursor.style.top = `${position.current.y}px`;

        cursor.className = "custom-cursor";
        if (isPointer) cursor.classList.add("scale");
        if (isClicking) cursor.classList.add("clicking");
        if (isHidden) cursor.classList.add("hidden");
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    animationFrameId = requestAnimationFrame(updateCursor);

    const onMouseMove = (e) => {
      mousePosition.current.x = e.clientX;
      mousePosition.current.y = e.clientY;

      const target = e.target;
      const pointerElements = ["A", "BUTTON"];

      // تحقق إذا العنصر أو أقرب عنصر هو clickable
      const hasPointer =
        pointerElements.includes(target.tagName) ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsPointer(hasPointer);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isPointer, isClicking, isHidden]);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor fixed w-6 h-6 rounded-full bg-pink-500 pointer-events-none transition-transform duration-150 ease-out z-50"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
};

export default CursorFollower;
