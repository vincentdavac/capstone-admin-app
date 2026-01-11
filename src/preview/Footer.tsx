/* eslint-disable react-hooks/exhaustive-deps */
import { FacebookIcon } from "lucide-react";
import API_BASE_URL from "../config/coreApi";
import { AppContext } from "../context/AppContext";
import { useContext, useEffect, useState } from "react";

// 🧩 Interface
export interface FooterData {
  id: number;
  attributes: {
    image: string;
    caption: string;
    documentationLink: string;
    researchPaperLink: string;
    emailAddress: string;
    facebookLink: string;
    youtubeLink: string;
    footerSubtitle: string;
    isArchived: boolean;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

interface Props {
  refresh?: boolean; // optional trigger to refetch
}

export default function Footer({ refresh }: Props) {
  const { token } = useContext(AppContext)!;
  const [loading, setLoading] = useState(true);
  const [footer, setFooter] = useState<FooterData | null>(null);

  // Fetch latest footer
  const fetchFooter = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/footers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.ok && data.data?.length > 0) {
        // Get the latest footer (last in array)
        setFooter(data.data[data.data.length - 1]);
      }
    } catch (err) {
      console.error("Error fetching footer:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooter();
  }, [refresh]);

  if (loading) {
    return (
      <section className="w-full py-16 flex justify-center items-center">
        <div className="flex justify-center items-center gap-2 text-gray-500">
          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
          Loading footer...
        </div>
      </section>
    );
  }

  if (!footer) return null;

  const attr = footer.attributes;

  return (
    <footer className="w-full bg-white text-[#023E8A]">
      <div className="container mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Left Column - Brand Info */}
          <div className="space-y-4">
            <img src={attr.image} alt="logo" className=" w-50 h-auto" />
            <p className="text-lg">{attr.caption}</p>
          </div>

          {/* Middle Columns - Links */}
          <div className="grid grid-cols-2 gap-10">
            {/* Quick Links */}
            <div>
              <h4 className="mb-2 text-2xl font-bold tracking-wide text-[#1E3A8A] sm:text-3xl md:text-xl">
                QUICK LINKS
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#homepage-slider" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#homepage-about" className="hover:underline">
                    About X-Stream
                  </a>
                </li>
                <li>
                  <a href="#homepage-team" className="hover:underline">
                    Meet the Team
                  </a>
                </li>
                <li>
                  <a href="#homepage-prototype" className="hover:underline">
                    Prototype
                  </a>
                </li>
                <li>
                  <a href="#homepage-faqs" className="hover:underline">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="mb-2 text-2xl font-bold tracking-wide text-[#1E3A8A] sm:text-3xl md:text-xl">
                RESOURCES
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={attr.documentationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Project Documentation
                  </a>
                </li>
                <li>
                  <a
                    href={attr.researchPaperLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Research Paper
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${attr.emailAddress}`}
                    className="hover:underline"
                  >
                    Contact Form
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div>
            <h4 className="mb-2 text-2xl font-bold tracking-wide text-[#1E3A8A] sm:text-3xl md:text-xl">
              CONTACT INFORMATION
            </h4>
            <ul className="space-y-3">
              <li>
                Email:{" "}
                <a
                  href={`mailto:${attr.emailAddress}`}
                  className="hover:underline"
                >
                  {attr.emailAddress}
                </a>
              </li>
              <li className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <a
                    href={attr.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon size={20} />
                  </a>
                  <a
                    href={attr.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a2.974 2.974 0 0 0-2.093-2.106C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.405.58A2.974 2.974 0 0 0 .502 6.186C0 8.1 0 12 0 12s0 3.9.502 5.814a2.974 2.974 0 0 0 2.093 2.106C4.495 20.5 12 20.5 12 20.5s7.505 0 9.405-.58a2.974 2.974 0 0 0 2.093-2.106C24 15.9 24 12 24 12s0-3.9-.502-5.814zM9.75 15.568V8.432L15.818 12 9.75 15.568z" />
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-16 border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <p className="font-light">{attr.footerSubtitle}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
