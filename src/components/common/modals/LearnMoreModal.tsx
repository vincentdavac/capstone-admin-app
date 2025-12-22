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
      <div className="group relative w-full max-w-2xl mx-4">
        {/* Matching the blue-cyan gradient from your Privacy Policy modal */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            {/* Empty div to balance the layout with the close button */}
            <div className="w-6"></div>
            
            {/* Centered title */}
            <h2 className="text-xl font-bold text-white text-center flex-1">
              Know Your River, Instantly
            </h2>
            
            {/* Close button stays on the right */}
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white w-6 flex justify-end"
            >
              ✕
            </button>
          </div>

          {/* Removed overflow-y-auto and max-height constraints */}
          <div className="pr-2">
            {/* Centered description */}
            <p className="mb-8 text-white/90 text-center">
              X-STREAM empowers residents and local authorities by providing real-time information on river conditions, helping communities stay safe and prepared.
            </p>

            {/* Feature list with box styling */}
            <div className="space-y-3">
              {/* Real Time Alerts */}
              <div className="flex items-start p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white text-lg">✓</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">Real Time Alerts</h4>
                  <p className="text-white/80 text-sm mt-1">Receive instant notifications about rainfall, water levels, and potential flooding in your area.</p>
                </div>
              </div>

              {/* Live Sensor Data */}
              <div className="flex items-start p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white text-lg">✓</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">Live Sensor Data</h4>
                  <p className="text-white/80 text-sm mt-1">Access temperature, flow rate, water quality, and other important environmental measurements.</p>
                </div>
              </div>

              {/* Community Reporting */}
              <div className="flex items-start p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white text-lg">✓</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">Community Reporting</h4>
                  <p className="text-white/80 text-sm mt-1">Submit photos or updates about local river conditions to help others stay informed.</p>
                </div>
              </div>

              {/* Emergency Guidance */}
              <div className="flex items-start p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white text-lg">✓</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">Emergency Guidance</h4>
                  <p className="text-white/80 text-sm mt-1">Quick access to safety instructions and alerts in case of extreme weather or rising water levels.</p>
                </div>
              </div>

              {/* User-Friendly Dashboard */}
              <div className="flex items-start p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200">
                <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-white text-lg">✓</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">User-Friendly Dashboard</h4>
                  <p className="text-white/80 text-sm mt-1">Easy-to-read interface showing current river data and alerts at a glance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
