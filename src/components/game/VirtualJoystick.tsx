import React, { useRef, useState, useEffect, useCallback } from "react";
import type { MoveVector } from "../../game/gameBridge";

interface VirtualJoystickProps {
  onMove: (vector: MoveVector) => void;
  size?: number;
  deadZone?: number;
}

export const VirtualJoystick: React.FC<VirtualJoystickProps> = ({
  onMove,
  size = 130,
  deadZone = 0.12,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const isInteractingRef = useRef(false);
  isInteractingRef.current = isInteracting;
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  const radius = size / 2;
  const maxDistance = radius * 0.72;

  const resetJoystick = useCallback(() => {
    setIsInteracting(false);
    isInteractingRef.current = false;
    setKnobPos({ x: 0, y: 0 });
    onMoveRef.current({ x: 0, y: 0 });
  }, []);

  const handlePointerStart = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsInteracting(true);
    isInteractingRef.current = true;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    handlePointerMove(e);
  };

  const handlePointerMove = useCallback(
    (e: React.PointerEvent | PointerEvent) => {
      if (!isInteractingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dx = e.clientX - centerX;
      let dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance > maxDistance) {
        const angle = Math.atan2(dy, dx);
        dx = Math.cos(angle) * maxDistance;
        dy = Math.sin(angle) * maxDistance;
      }

      setKnobPos({ x: dx, y: dy });

      // Calculate normalized vector with dead zone
      let normX = dx / maxDistance;
      let normY = dy / maxDistance;
      const normDist = Math.hypot(normX, normY);

      if (normDist < deadZone) {
        normX = 0;
        normY = 0;
      }

      onMoveRef.current({ x: parseFloat(normX.toFixed(3)), y: parseFloat((-normY).toFixed(3)) });
    },
    [maxDistance, deadZone]
  );

  const handlePointerEnd = (e: React.PointerEvent) => {
    resetJoystick();
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already lost
    }
  };

  useEffect(() => {
    const handleGlobalRelease = () => {
      if (isInteractingRef.current) {
        resetJoystick();
      }
    };
    window.addEventListener("pointerup", handleGlobalRelease);
    window.addEventListener("mouseup", handleGlobalRelease);
    window.addEventListener("touchend", handleGlobalRelease);
    window.addEventListener("pointercancel", handleGlobalRelease);
    window.addEventListener("touchcancel", handleGlobalRelease);
    window.addEventListener("blur", handleGlobalRelease);
    return () => {
      window.removeEventListener("pointerup", handleGlobalRelease);
      window.removeEventListener("mouseup", handleGlobalRelease);
      window.removeEventListener("touchend", handleGlobalRelease);
      window.removeEventListener("pointercancel", handleGlobalRelease);
      window.removeEventListener("touchcancel", handleGlobalRelease);
      window.removeEventListener("blur", handleGlobalRelease);
    };
  }, [resetJoystick]);

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label="Analog virtual joystick untuk bergerak"
      onPointerDown={handlePointerStart}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      style={{ width: size, height: size }}
      className="relative rounded-full bg-slate-900/60 backdrop-blur-md border-2 border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.36)] touch-none select-none flex items-center justify-center cursor-grab active:cursor-grabbing"
    >
      {/* Outer directional grid markings */}
      <div className="absolute inset-2 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute w-1 h-3 top-1 left-1/2 -translate-x-1/2 bg-white/40 rounded-full" />
      <div className="absolute w-1 h-3 bottom-1 left-1/2 -translate-x-1/2 bg-white/40 rounded-full" />
      <div className="absolute h-1 w-3 left-1 top-1/2 -translate-y-1/2 bg-white/40 rounded-full" />
      <div className="absolute h-1 w-3 right-1 top-1/2 -translate-y-1/2 bg-white/40 rounded-full" />

      {/* Thumb Knob */}
      <div
        style={{
          transform: `translate3d(${knobPos.x}px, ${knobPos.y}px, 0)`,
          width: size * 0.44,
          height: size * 0.44,
        }}
        className={`rounded-full transition-transform ease-out duration-75 flex items-center justify-center shadow-lg border-2 ${
          isInteracting
            ? "bg-gradient-to-tr from-emerald-400 to-emerald-500 border-white text-slate-950 scale-105"
            : "bg-white/80 border-emerald-300 text-emerald-700 hover:bg-white"
        }`}
      >
        <div className="w-4 h-4 rounded-full bg-white/40 border border-white/60 pointer-events-none" />
      </div>
    </div>
  );
};
