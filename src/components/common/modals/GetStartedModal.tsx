import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LearnMoreModal({ open, onClose }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
      <div className="group relative w-full max-w-md mx-4">
        {/* Blue-cyan gradient matching the style */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            {/* Empty div to balance layout */}
            <div className="w-6"></div>
            
            {/* Centered title */}
            <div className="text-center flex-1">
              <h2 className="text-xl font-bold text-white">
                Get X-STREAM Now
              </h2>
            </div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white w-6 flex justify-end transition-colors duration-200"
            >
              ✕
            </button>
          </div>

          <div className="pr-2">
            {/* Description text */}
            <div className="text-center mb-8">
              <p className="text-white/80 text-sm">
                Get instant updates on river conditions anytime, anywhere - helping you prepare, respond, and stay aware with real-time alerts right on your phone.
              </p>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex flex-col items-center mb-4"> {/* Changed from mb-6 to mb-4 */}
              <div className="w-48 h-48 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                {/* QR Code placeholder - you can replace this with an actual QR code image */}
                <img 
                  src="\public\x-stream-qr-code.png" 
                  alt="X-STREAM QR Code" 
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <p className="text-white font-medium mb-2">Scan Me</p> {/* Changed from mb-4 to mb-2 */}
            </div>

            {/* Glass-style button - reduced top margin */}
            <div className="flex justify-center mt-2"> {/* Added mt-2 instead of default spacing */}
              <button
                className="w-full max-w-xs px-4 py-3 text-sm text-white/90 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-300"
                onClick={() => window.open('https://drive.google.com/drive/folders/1iM_kS9hP_LpZ8PBo2D9HzyODkLYW_2Xg', '_blank')}
              >
                Click Here to Download X-STREAM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}