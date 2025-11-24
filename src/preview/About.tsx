/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import API_BASE_URL from "../config/coreApi";
import { AppContext } from "../context/AppContext";

interface AboutData {
  id: number;
  attributes: {
    title: string;
    caption: string;
    image: string;
    sideTitle: string;
    sideDescription: string;
    videoLink: string;
    isArchived: boolean;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

interface CardData {
  id: number;
  attributes: {
    homepageAboutId: number;
    cardTitle: string;
    cardDescription: string;
    isArchive: boolean;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

interface Props {
  refresh?: boolean; // optional trigger to refetch
}

// const getEmbedUrl = (url: string) => {
//   if (!url) return "";
//   // Match YouTube watch URLs
//   const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/);
//   if (match && match[1]) {
//     return `https://www.youtube.com/embed/${match[1]}`;
//   }
//   return url; // fallback if not a YouTube URL
// };

const getEmbedUrl = (url: string) => {
  if (!url) return "";
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/);
  if (match && match[1]) {
    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1&controls=0&modestbranding=1&rel=0`;
  }
  return url;
};

export default function About({ refresh }: Props) {
  const { token } = useContext(AppContext)!;

  const [about, setAbout] = useState<AboutData | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAboutAndCards = async () => {
    setLoading(true);
    try {
      // Fetch About Section
      const aboutRes = await fetch(`${API_BASE_URL}/abouts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const aboutData = await aboutRes.json();
      if (aboutRes.ok && aboutData.data) setAbout(aboutData.data);

      // Fetch Active Cards
      const cardsRes = await fetch(`${API_BASE_URL}/about-cards-active`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const cardsData = await cardsRes.json();
      if (cardsRes.ok && cardsData.data) setCards(cardsData.data);
    } catch (error) {
      console.error("Error fetching About or Cards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchAboutAndCards();
  }, [token, refresh]);

  if (loading) {
    return (
      <section className="w-full py-16 flex justify-center items-center">
        <div className="flex justify-center items-center gap-2 text-gray-500">
          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
          Loading About Us...
        </div>
      </section>
    );
  }

  if (!about) return null;

  const { title, caption, image, sideTitle, sideDescription, videoLink } =
    about.attributes;

  return (
    <section className="w-full py-16 relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(180deg, #1E3A8A 0%, #3B82F6 50%, #60A5FA 100%)`,
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-100"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}wave.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-2 text-center">
          <h2 className="mb-2 text-2xl font-bold text-[#FFFFFF] md:text-5xl">
            {title}
          </h2>
          <p className="max-w-6xl mx-auto pt-7 text-justify text-lg leading-relaxed text-[#FFFFFF]">
            {caption}
          </p>
        </div>

        <div className="mb-16 flex flex-col items-center gap-8 pt-10 lg:flex-row max-w-6xl mx-auto">
          <div className="lg:w-1/2">
            <div className="overflow-hidden rounded-lg shadow-xl">
              {videoLink ? (
                // <iframe
                //   src={getEmbedUrl(videoLink)}
                //   title={title}
                //   className="h-100 w-full object-cover"
                //   frameBorder="0"
                //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                //   allowFullScreen
                // />
                <iframe
                  src={getEmbedUrl(videoLink)}
                  title={title}
                  className="h-100 w-full object-cover"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={image}
                  alt={title}
                  className="h-100 w-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="flex flex-col gap-y-8">
              <p className="mb-4 text-justify text-lg leading-relaxed text-[#FFFFFF]">
                {sideTitle}
              </p>
              <p className="mb-4 text-justify text-lg leading-relaxed text-[#FFFFFF]">
                {sideDescription}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((card) => {
            let icon;
            switch (card.attributes.cardTitle.toUpperCase()) {
              case "OUR MISSION":
                icon = (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transform transition-transform duration-300 group-hover:rotate-12"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                );
                break;
              case "OUR VISION":
                icon = (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transform transition-transform duration-300 group-hover:rotate-12"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                );
                break;
              case "OUR VALUES":
                icon = (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transform transition-transform duration-300 group-hover:rotate-12"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                );
                break;
              default:
                icon = null;
            }

            return (
              <div key={card.id} className="group relative flex flex-col">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative rounded-xl glass-effect p-6 shadow-lg border border-white/20 backdrop-blur-sm transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-white/40 flex flex-col flex-1">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
                      {icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#FFFFFF] text-center transform transition-transform duration-300 group-hover:translate-y-1">
                      {card.attributes.cardTitle}
                    </h3>
                  </div>
                  <p className="text-justify text-white/90 leading-relaxed text-base transform transition-all duration-300 group-hover:text-white flex-1">
                    {card.attributes.cardDescription}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
