import React from "react";

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: "sky" | "amber" | "emerald" | "rose" | "purple";
  height?: string;
  showText?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = "sky",
  height = "h-2.5",
  showText = false,
}) => {
  const clamped = Math.max(0, Math.min(100, isNaN(progress) ? 0 : progress));

  const colorClasses = {
    sky: "bg-sky-500",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
    rose: "bg-rose-500",
    purple: "bg-purple-500",
  }[color];

  return (
    <div className="w-full space-y-1">
      {showText && (
        <div className="flex justify-between text-xs font-semibold text-slate-600">
          <span>Progres</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div
        className={`w-full bg-slate-100 rounded-full overflow-hidden ${height}`}
      >
        <div
          className={`${height} ${colorClasses} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
