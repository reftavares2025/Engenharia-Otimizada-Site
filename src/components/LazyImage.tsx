import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Image as ImageIcon } from 'lucide-react';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  containerClassName?: string;
  skeletonClassName?: string;
  fallbackSrc?: string;
  showSkeleton?: boolean;
  threshold?: number;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  skeletonClassName = '',
  fallbackSrc,
  showSkeleton = true,
  loading = 'lazy',
  decoding = 'async',
  referrerPolicy = 'no-referrer',
  threshold = 300,
  children,
  onClick,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    if (fallbackSrc && !hasError) {
      setHasError(true);
    } else {
      setIsLoaded(true);
      setHasError(true);
    }
  };

  // Skeleton Screen / Shimmer Element used while loading
  const skeletonElement = (
    <div
      className={`absolute inset-0 z-0 bg-slate-900 flex items-center justify-center overflow-hidden pointer-events-none ${skeletonClassName}`}
      aria-hidden="true"
    >
      {/* Animated gradient shimmer wave */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-pulse" />
      
      {/* Subtle technical blueprint grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

      {/* Skeleton placeholder icon */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 text-slate-600/70">
        <ImageIcon className="w-6 h-6 animate-pulse" />
        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Carregando...</span>
      </div>
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      onClick={onClick}
    >
      {/* Skeleton Screen active until image enters viewport and completes loading */}
      {showSkeleton && !isLoaded && skeletonElement}

      {/* Viewport-based lazy loading image with react-lazy-load-image-component & native lazy attribute */}
      <LazyLoadImage
        src={hasError && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        threshold={threshold}
        effect="opacity"
        wrapperClassName="w-full h-full block"
        beforeLoad={() => {}}
        afterLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full transition-opacity duration-500 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...(props as any)}
      />

      {/* Children overlays (e.g. badges, labels, gradient overlays, expand buttons) */}
      {children}
    </div>
  );
};
