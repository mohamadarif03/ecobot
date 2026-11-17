import React, { useState, useEffect } from "react";
import { getRemainingDailyTime, getRemainingWeeklyTime } from "../../data/missions";
import { Clock } from "lucide-react";

export const DailyCountdown: React.FC<{ className?: string }> = ({ className = "" }) => {
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

export const WeeklyCountdown: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [time, setTime] = useState(() => getRemainingWeeklyTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getRemainingWeeklyTime());
    }, 60000); // 1 minute interval for weekly countdown
    return () => clearInterval(timer);
  }, []);

  return (
    <span className={`inline-flex items-center gap-1.5 font-bold text-[12px] text-slate-600 ${className}`}>
      <Clock className="w-3.5 h-3.5 text-sky-600" />
      <span>Reset dalam {time.formatted}</span>
    </span>
  );
};
