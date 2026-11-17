import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white rounded-3xl border border-slate-100 shadow-sm transition-all ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
