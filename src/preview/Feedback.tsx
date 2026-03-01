import { useEffect, useState, useRef } from 'react';
import { StarIcon } from 'lucide-react';
import API_BASE_URL from '../config/coreApi';
import Modal from './FeedbackModal.tsx';

interface FeedbackData {
  id: number;
  attributes: {
    userName: string;
    userImage: string;
    rate: number;
    feedback: string;
    createdDate: string;
  };
}

interface Props {
  refresh?: boolean;
}

export default function Testimonials({ refresh }: Props) {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackData | null>(
    null,
  );
  
  // Drag to scroll refs and state
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const fetchActiveFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/public-active-feedbacks`, {
        headers: {
          Accept: 'application/json',
        },
      });
      const data = await res.json();
      if (res.ok && data.data) setFeedbacks(data.data);
    } catch (err) {
      console.error('Error fetching active feedbacks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveFeedbacks();
  }, [refresh]);

  if (loading) {
    return (
      <section className="w-full py-16 flex justify-center items-center">
        <div className="flex justify-center items-center gap-2 text-gray-500">
          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
          Loading feedback...
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 relative overflow-hidden">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(180deg, #1E3A8A 0%, #3B82F6 50%, #60A5FA 100%)`,
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-100"
        style={{
          backgroundImage: `url('/wave.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-3xl font-bold text-white md:text-5xl">
            VOICES FROM OUR COMMUNITY
          </h2>
          <p
            className="max-w-3xl mx-auto text-lg font-light text-white"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 100 }}
          >
            Your feedback helps us improve, innovate, and continue building
            solutions that make coastal communities safer and more resilient.
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-2 py-4 hide-scrollbar snap-x"
          onMouseDown={(e) => {
            isDragging.current = true;
            startX.current = e.pageX - scrollRef.current!.offsetLeft;
            scrollLeft.current = scrollRef.current!.scrollLeft;
          }}
          onMouseLeave={() => (isDragging.current = false)}
          onMouseUp={() => (isDragging.current = false)}
          onMouseMove={(e) => {
            if (!isDragging.current) return;
            e.preventDefault();
            const x = e.pageX - scrollRef.current!.offsetLeft;
            const walk = x - startX.current;
            scrollRef.current!.scrollLeft = scrollLeft.current - walk;
          }}
          style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
        >
          {feedbacks.map((f) => {
            const { userName, userImage, rate, feedback, createdDate } =
              f.attributes;
            
            const cardGradient = "from-blue-400 to-cyan-400";
            
            const truncated =
              feedback.length > 160 ? feedback.slice(0, 160) + "..." : feedback;

            return (
              <div
                key={f.id}
                className="group relative flex flex-col snap-start transition-transform duration-300 flex-shrink-0"
                style={{
                  width: "calc(25% - 1.125rem)", 
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${cardGradient} rounded-xl blur-md opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}
                ></div>

                <div className="relative z-10 rounded-xl glass-effect p-4 shadow-lg border border-white/20 backdrop-blur-sm transform transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:border-white/40 flex flex-col flex-1 h-full will-change-transform origin-center">
                  <div className="mb-3 flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < rate
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-white/80 text-white/60"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="montserrat mb-2 text-sm font-light text-white/90 text-justify leading-relaxed break-words">
                    "{truncated}"
                  </p>

                  {feedback.length > 160 && (
                    <button
                      className="text-sm text-blue-300 hover:text-white transition-colors text-left mt-auto"
                      onClick={() => setSelectedFeedback(f)}
                    >
                      See More
                    </button>
                  )}

                  <div className="flex items-center mt-4">
                    <div className="mr-3 h-11 w-11 overflow-hidden rounded-full border-2 border-white/30 flex-shrink-0">
                      <img
                        src={userImage}
                        alt={userName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="montserrat font-light text-white truncate">
                        {userName}
                      </h4>
                      <p className="montserrat font-light text-sm italic text-white truncate">
                        {createdDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {feedbacks.length === 0 && (
            <p className="text-white text-center w-full">
              No active feedbacks found.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedFeedback && (
        <Modal onClose={() => setSelectedFeedback(null)}>
          <div className="relative p-6 flex flex-col gap-4 break-words">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-gray-300 flex-shrink-0">
                <img
                  src={selectedFeedback.attributes.userImage}
                  alt={selectedFeedback.attributes.userName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="text-lg font-semibold text-gray-900 truncate">
                  {selectedFeedback.attributes.userName}
                </h4>
                <p className="text-sm italic text-gray-500 truncate">
                  {selectedFeedback.attributes.createdDate}
                </p>
              </div>
            </div>

            <p className="text-base text-gray-900 leading-relaxed break-words text-justify">
              {selectedFeedback.attributes.feedback}
            </p>
          </div>
        </Modal>
      )}
    </section>
  );
}