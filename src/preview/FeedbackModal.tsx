interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function FeedbackModal({ children, onClose }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient overlay for subtle effect (optional) */}
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 blur opacity-10"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-4 break-words">
          {children}
        </div>

        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-colors font-bold text-xl"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}
