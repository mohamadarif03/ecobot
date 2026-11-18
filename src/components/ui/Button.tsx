import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer select-none";

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
  }[size];

  const variantClasses = {
    primary:
      "bg-emerald-600 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 active:bg-emerald-700",
    secondary:
      "bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 active:bg-amber-700",
    outline:
      "bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 active:bg-slate-100",
    ghost:
      "bg-transparent hover:bg-slate-100 text-slate-600 active:bg-slate-200",
    danger:
      "bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/20 active:bg-rose-700",
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
