/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { StarIcon } from "lucide-react";
import API_BASE_URL from "../config/coreApi";
import { AppContext } from "../context/AppContext";

// 🧩 Feedback Interface
export interface FeedbackData {
  id: number;
  attributes: {
    userName: string;
    userImage: string;
    rate: number;
    feedback: string;
    isArchived: boolean;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

interface Props {
  refresh?: boolean;
}

export default function Testimonials({ refresh }: Props) {
  const { token } = useContext(AppContext)!;
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  // ✅ Fetch active feedbacks
  const fetchActiveFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/active-feedbacks`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setFeedbacks(data.data);
      }
    } catch (err) {
      console.error("Error fetching active feedbacks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchActiveFeedbacks();
  }, [refresh, token]);

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

  const currentFeedbacks = feedbacks.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

  return (
    <section className="w-full py-16 relative">
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
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
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

        {/* Feedback Cards */}
        <div className="flex flex-col md:flex-row gap-5 justify-center">
          {currentFeedbacks.map((f, index) => {
            const { userName, userImage, rate, feedback } = f.attributes;
            const gradients = [
              "from-blue-400 to-cyan-400",
              "from-cyan-400 to-blue-500",
              "from-blue-500 to-cyan-400",
            ];

            return (
              <div
                key={f.id}
                className="group relative flex min-w-[80vw] md:min-w-0 md:flex-1 flex-col transition-transform duration-300 snap-center"
              >
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${
                    gradients[index % gradients.length]
                  } rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}
                ></div>

                <div className="relative rounded-xl glass-effect p-6 shadow-lg border border-white/20 backdrop-blur-sm transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-white/40 flex flex-col flex-1">
                  <div className="mb-4 flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        size={20}
                        className={`${
                          i < rate
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-white/80 text-white/60"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="montserrat mb-6 flex-1 text-lg font-light text-white/90 text-justify leading-relaxed">
                    "{feedback}"
                  </p>

                  <div className="flex items-center">
                    <div className="mr-4 h-12 w-12 overflow-hidden rounded-full border-2 border-white/30">
                      <img
                        src={userImage}
                        alt={userName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="montserrat font-light text-white">
                        {userName}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => setCurrentPage(pageIndex)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                pageIndex === currentPage
                  ? "bg-white"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
