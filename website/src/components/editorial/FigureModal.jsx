import { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

/**
 * FigureModal
 * Accessible image viewer for high-resolution research figures exported from notebook.
 * Does not use em dashes.
 */
export default function FigureModal({ isOpen, onClose, src, alt, caption, figureNumber }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt || 'Figure viewer'}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#172B29]/75 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-[#FCFBF7] border border-[#C9D0C6] shadow-2xl overflow-hidden rounded-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#C9D0C6] bg-[#F5F3EB]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[#23645A] font-semibold">
              {figureNumber || 'Research Figure'}
            </span>
            <span className="text-xs text-[#4D5D57]">High-resolution export</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#4D5D57] hover:text-[#172B29] hover:bg-[#E6ECE4] transition-colors cursor-pointer"
            aria-label="Close figure viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Container */}
        <div className="overflow-auto p-4 sm:p-6 flex items-center justify-center bg-white">
          <img
            src={src}
            alt={alt}
            className="max-h-[70vh] w-auto object-contain select-none"
          />
        </div>

        {/* Modal Caption */}
        {caption && (
          <div className="px-4 py-3 border-t border-[#C9D0C6] bg-[#FCFBF7] text-xs sm:text-sm text-[#4D5D57]">
            <p className="max-w-4xl leading-relaxed">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
