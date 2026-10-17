import { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink, Download } from 'lucide-react';

/**
 * FigureModal
 * Accessible high-resolution image viewer for manuscript figures with multi-level zoom.
 * Strictly zero em dashes used.
 */
export default function FigureModal({
  isOpen,
  onClose,
  src,
  figurePath,
  alt,
  title,
  caption,
  figureNumber
}) {
  const imageSource = src || figurePath || '';
  const displayTitle = title || figureNumber || alt || 'Research Publication Figure';

  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setZoomLevel((z) => Math.min(2.5, +(z + 0.25).toFixed(2)));
      if (e.key === '-' || e.key === '_') setZoomLevel((z) => Math.max(1, +(z - 0.25).toFixed(2)));
      if (e.key === '0') setZoomLevel(1);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setZoomLevel(1);
      setIsLoaded(false);
      setLoadError(false);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel((z) => Math.min(2.5, +(z + 0.25).toFixed(2)));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(1, +(z - 0.25).toFixed(2)));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={displayTitle}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#111816]/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-[#FAF9F5] border border-[#E2E0D8] shadow-2xl rounded-xs overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#E2E0D8] bg-[#F3F1E8]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-[#1B5E54] uppercase tracking-wider">
              {displayTitle}
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-[#55635E]">
              Resolution: 300 DPI Export
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center border border-[#E2E0D8] rounded-xs bg-white text-xs font-mono">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-1.5 text-[#55635E] hover:text-[#111816] disabled:opacity-40 cursor-pointer transition-colors"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-[11px] text-[#111816] font-medium min-w-[40px] text-center select-none">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
                className="p-1.5 text-[#55635E] hover:text-[#111816] disabled:opacity-40 cursor-pointer transition-colors"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              {zoomLevel > 1 && (
                <button
                  onClick={handleResetZoom}
                  className="p-1.5 border-l border-[#E2E0D8] text-[#55635E] hover:text-[#111816] cursor-pointer"
                  title="Reset Zoom (0)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Direct Link in New Tab */}
            {imageSource && (
              <a
                href={imageSource}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-[#55635E] hover:text-[#111816] hover:bg-[#E2E0D8] rounded-xs transition-colors cursor-pointer"
                title="Open raw image in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-[#55635E] hover:text-[#111816] hover:bg-[#E2E0D8] rounded-xs transition-colors cursor-pointer ml-1"
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewport Canvas */}
        <div className="relative overflow-auto p-4 sm:p-8 flex items-center justify-center bg-white min-h-[360px] max-h-[68vh]">
          {!isLoaded && !loadError && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#FAF9F5] text-xs font-mono text-[#55635E]">
              Loading high-resolution figure...
            </div>
          )}

          {loadError ? (
            <div className="text-center p-8 font-mono text-xs text-[#A33B20]">
              <p className="font-semibold mb-1">Figure asset could not be loaded directly.</p>
              <p className="text-[#55635E]">Path: {imageSource}</p>
            </div>
          ) : (
            <div
              className="transition-transform duration-150 ease-out flex items-center justify-center"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center'
              }}
            >
              <img
                src={imageSource}
                alt={alt || displayTitle}
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                  setIsLoaded(true);
                  setLoadError(true);
                }}
                className={`max-h-[64vh] w-auto max-w-full object-contain select-none transition-opacity duration-200 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                draggable={false}
              />
            </div>
          )}
        </div>

        {/* Caption Footer */}
        {caption && (
          <div className="px-4 sm:px-6 py-3 border-t border-[#E2E0D8] bg-[#FAF9F5] text-xs text-[#55635E] leading-relaxed">
            <span className="font-mono font-medium text-[#111816] mr-2">Note:</span>
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}
