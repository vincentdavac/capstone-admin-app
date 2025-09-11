import { useEffect, useState } from "react";
import { Button } from "../common/Loader/Button";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

// CRUD
export default function Slider() {
  const slides = [
    {
      image:
        "https://cdn.sealite.com/wp-content/uploads/20201127142046/Large-Ocean-Buoys.png",
      title: "Grow Better with Hydroponics",
      description:
        "Sustainable, soil-free growing solutions for your home or business. Experience faster growth and higher yields with our innovative hydroponics systems.",
    },
    {
      image:
        "https://www.resinextrad.com/en/wp-content/uploads/2020/01/weather-buoy.jpg",
      title: "Year-Round Growing",
      description:
        "Don't let seasons limit your garden. With hydroponics, grow fresh produce any time of year, regardless of outdoor conditions.",
    },
    {
      image:
        "https://cdn.aiidatapro.net/media/f2/cb/23/t780x490/f2cb23b07a7b29e5384e21d6a0ad3a46.webp",
      title: "Perfect for Any Space",
      description:
        "From apartment countertops to commercial operations, our hydroponic systems are designed to fit your unique space and needs.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="container mx-auto px-4 py-16 md:py-24 outline-1 outline-[#959ea5] rounded-lg">
        <div className="flex flex-col items-center md:flex-row">
          <div className=" mb-10 md:mb-0 md:w-1/2">
            <h1 className="mb-4 text-4xl leading-tight font-bold text-[#023E8A] md:text-5xl lg:text-5xl">
              {slides[currentSlide].title}
            </h1>
            <p className="mb-8 max-w-lg text-lg text-[#000000] md:text-xl">
              {slides[currentSlide].description}
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
          <div className="relative w-full md:w-1/2">
            <div className="relative h-[300px] min-h-[300px] overflow-hidden rounded-lg shadow-xl md:h-[400px]">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt="Hydroponic growing system"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#386742]/20 to-transparent"></div>
                </div>
              ))}
              {/* Slider controls */}
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/70 p-2 text-[#39A7FF] hover:bg-white"
                aria-label="Previous slide"
              >
                <ChevronLeftIcon size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/70 p-2 text-[#39A7FF] hover:bg-white"
                aria-label="Next slide"
              >
                <ChevronRightIcon size={24} />
              </button>
              {/* Slide indicators */}
              <div className="absolute right-0 bottom-4 left-0 flex justify-center space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-3 w-3 rounded-full ${
                      index === currentSlide ? "bg-[#87C4FF]" : "bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
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
