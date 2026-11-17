import React, { useState } from "react";
import { Trash2 } from "lucide-react";

interface WasteIllustrationProps {
  id: string;
  className?: string;
  alt?: string;
}

export const WasteIllustration: React.FC<WasteIllustrationProps> = ({
  id,
  className = "",
  alt,
}) => {
  const [hasError, setHasError] = useState(false);
  const src = `/assets/sampah/${id}.svg`;

  if (hasError) {
    return (
      <div
        className={`bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-4 text-slate-400 ${className}`}
        role="img"
        aria-label={alt || id}
      >
        <Trash2 className="w-10 h-10 mb-2 text-slate-400" />
        <span className="text-xs font-bold capitalize text-slate-500">
          {id.replace("-", " ")}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || id}
      onError={() => setHasError(true)}
      className={`${className} object-contain select-none`}
      loading="lazy"
    />
  );
};
