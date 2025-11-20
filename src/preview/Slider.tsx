import { useContext, useEffect, useState } from "react";
import { Button } from "../common/Loader/Button";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import { AppContext } from "../context/AppContext";
import API_BASE_URL from "../config/coreApi";

export interface SliderData {
  id: number;
  attributes: {
    title: string;
    description: string;
    isArchive: boolean | string | number;
    image: string;
  };
}

export default function Slider() {
  const { token } = useContext(AppContext)!;

  const [slides, setSlides] = useState<SliderData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch sliders from API
  const fetchSliders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/sliders`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.data) {
        setSlides(data.data); // Expecting: { status, message, data: [...] }
      } else {
        console.error("Failed fetching sliders:", data);
      }
    } catch (error) {
      console.error("Error fetching sliders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  // Prevent crash while loading
  if (loading) {
    return (
      <div className="w-full text-center py-24 text-xl font-semibold">
        Loading slider...
      </div>
    );
  }

  // No sliders found
  if (slides.length === 0) {
    return (
      <div className="w-full text-center py-24 text-xl font-semibold">
        No slider data available.
      </div>
    );
  }

  const active = slides[currentSlide].attributes;

  return (
    <>
      <div className="container mx-auto px-4 py-16 md:py-24 bg-[#FFFFFF] rounded-lg dark:bg-gray-800 dark:outline-gray-700">
        <div className="flex flex-col items-center md:flex-row">
          {/* LEFT CONTENT */}
          <div className="mb-10 md:mb-0 md:w-1/2 pr-8 max-w-xl">
            <h1 className="mb-4 text-4xl leading-tight font-bold text-[#023E8A] md:text-5xl lg:text-5xl dark:text-white break-words">
              {active.title}
            </h1>

            <p className="mb-8 text-lg text-[#000000] md:text-xl dark:text-gray-300 break-words">
              {active.description}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button>Get Started</Button>
              <Button variant="outline">
                <span className="flex items-center">
                  Learn More
                  <ArrowRightIcon size={18} className="ml-2" />
                </span>
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative w-full md:w-1/2">
            <div className="relative h-[300px] min-h-[300px] overflow-hidden rounded-lg shadow-xl md:h-[400px]">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={slide.attributes.image}
                    alt={slide.attributes.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#386742]/20 to-transparent"></div>
                </div>
              ))}

              {/* Prev Button */}
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/70 p-2 text-[#453EFE] hover:bg-white dark:bg-gray-900/70 dark:hover:bg-gray-900"
              >
                <ChevronLeftIcon size={24} />
              </button>

              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/70 p-2 text-[#453EFE] hover:bg-white dark:bg-gray-900/70 dark:hover:bg-gray-900"
              >
                <ChevronRightIcon size={24} />
              </button>

              {/* Indicators */}
              <div className="absolute right-0 bottom-4 left-0 flex justify-center space-x-2">
                {slides.map((_slide, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-3 w-3 rounded-full ${
                      index === currentSlide ? "bg-[#453EFE]" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
