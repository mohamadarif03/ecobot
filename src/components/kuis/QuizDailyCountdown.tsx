import React, { useState, useEffect } from "react";
import { getRemainingDailyTime } from "../../data/missions";
import { Clock } from "lucide-react";

export const QuizDailyCountdown: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const [time, setTime] = useState(() => getRemainingDailyTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getRemainingDailyTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className={`inline-flex items-center gap-1 font-mono text-[11px] ${className}`}>
      <Clock className="w-3 h-3 text-sky-600" />
      <span>{time.formatted}</span>
    </span>
  );
};
