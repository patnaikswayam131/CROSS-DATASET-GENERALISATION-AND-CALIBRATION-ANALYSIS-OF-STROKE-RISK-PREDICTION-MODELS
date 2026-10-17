import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * LightboxModal  -  full-screen zoomable view for manuscript figures.
 * Refined Obsidian Editorial presentation with clean lines and zero bubbly curves.
 * @param {{ isOpen: boolean, onClose: () => void, imageSrc: string, title: string, caption: string }} props
 */
export function LightboxModal({ isOpen, onClose, imageSrc, title, caption }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#111114] border border-white/10 rounded-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0c0c0e]">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold tracking-wider">
                  PEER-REVIEW ARTIFACT / PRIMARY FIGURE
                </span>
                <h3 className="text-sm md:text-base font-semibold text-zinc-100 mt-0.5">{title}</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-[4px] text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Image viewer */}
            <div className="flex-1 overflow-auto p-4 md:p-6 flex items-center justify-center bg-[#09090b]">
              <img
                src={imageSrc}
                alt={title}
                className="max-h-[65vh] w-auto object-contain rounded-[4px] border border-white/[0.08]"
              />
            </div>

            {/* Modal caption */}
            {caption && (
              <div className="px-6 py-4 border-t border-white/[0.08] bg-[#0c0c0e] text-xs text-zinc-400 leading-relaxed font-sans">
                <strong className="text-zinc-300 font-medium font-mono text-[11px] block mb-1">CAPTION NOTE:</strong>
                {caption}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LightboxModal;
