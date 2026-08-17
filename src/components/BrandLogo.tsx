import React from 'react';
import { APP_IMAGES } from '../assets/images';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'full';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'full',
  showSubtitle = true,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Exact Logo Icon & Symbol */}
      <div className="relative flex items-center justify-center bg-white rounded-xl shadow-md p-1 border border-stone-200 overflow-hidden flex-shrink-0">
        <img
          src={APP_IMAGES.logo}
          alt="Régis Tavares Engenharia Civil"
          loading="lazy"
          decoding="async"
          className="h-10 sm:h-12 w-auto object-contain"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-tight">
        <span
          className={`font-extrabold text-base sm:text-lg tracking-tight font-display ${
            variant === 'dark' ? 'text-slate-100' : 'text-slate-900'
          }`}
        >
          Régis Tavares
        </span>

        {showSubtitle && (
          <>
            <span
              className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${
                variant === 'dark' ? 'text-sky-300' : 'text-blue-700'
              }`}
            >
              Engenharia Civil | Controle de Obras
            </span>
            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-red-600">
              Engenharia Otimizada
            </span>
          </>
        )}
      </div>
    </div>
  );
};

