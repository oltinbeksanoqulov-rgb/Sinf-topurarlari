import React, { useState } from 'react';
import { User, Shield } from 'lucide-react';

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  imgClassName = '',
  fallbackName = 'Futbolchi',
  aspectRatio = 'aspect-[3/4]',
  objectPosition = 'top'
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If no source or failed to load, show clean sports portrait placeholder (without #number)
  if (!src || hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/60 overflow-hidden text-slate-300 ${aspectRatio} ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/10 via-transparent to-transparent" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center mb-2 shadow-inner">
            <User className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="text-xs font-semibold text-slate-300 px-2 text-center truncate max-w-[90%]">
            {fallbackName}
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">8-D Sinf</span>
        </div>
        <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none">
          <Shield className="w-24 h-24 text-white" />
        </div>
      </div>
    );
  }

  const resolvedPosition = objectPosition.startsWith('object-') 
    ? objectPosition.replace('object-', '') 
    : objectPosition;

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${aspectRatio} ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
          <User className="w-8 h-8 text-slate-600" />
        </div>
      )}
      <img
        src={src}
        alt={alt || fallbackName}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        style={{ objectPosition: resolvedPosition === 'top' ? 'top center' : resolvedPosition }}
        className={`w-full h-full object-cover object-top ${imgClassName} transition-all duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
      />
    </div>
  );
}
