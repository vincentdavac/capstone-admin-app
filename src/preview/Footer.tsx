import { FacebookIcon, YoutubeIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-[#023E8A] dark:bg-gray-900 dark:text-blue-200 rounded-lg shadow-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <img
              src="/logo/Logo.png"
              alt="Coastella Logo"
              className="w-60 h-auto max-w-full"
            />
            <p className="text-lg">Stay Informed, Stay Safe, Stay Ahead</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <h4 className="mb-2 text-2xl font-bold tracking-wide text-[#1E3A8A] dark:text-blue-400 sm:text-3xl md:text-xl">
                QUICK LINKS
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#homepage-slider"
                    className="hover:underline text-base sm:text-lg"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#homepage-about"
                    className="hover:underline text-base sm:text-lg"
                  >
                    About Coastella
                  </a>
                </li>
                <li>
                  <a
                    href="#homepage-team"
                    className="hover:underline text-base sm:text-lg"
                  >
                    Meet the Team
                  </a>
                </li>
                <li>
                  <a
                    href="#homepage-prototype"
                    className="hover:underline text-base sm:text-lg"
                  >
                    Prototype
                  </a>
                </li>
                <li>
                  <a
                    href="#homepage-faqs"
                    className="hover:underline text-base sm:text-lg"
                  >
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-2xl font-bold tracking-wide text-[#1E3A8A] dark:text-blue-400 sm:text-3xl md:text-xl">
                RESOURCES
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:underline text-base sm:text-lg">
                    Project Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-base sm:text-lg">
                    Research Paper
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-base sm:text-lg">
                    Contact Form
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline text-base sm:text-lg">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-2xl font-bold tracking-wide text-[#1E3A8A] dark:text-blue-400 sm:text-3xl md:text-xl">
              CONTACT INFORMATION
            </h4>
            <ul className="space-y-3">
              <li className="text-base sm:text-lg">
                Email:{" "}
                <a
                  href="mailto:coastella.2025@gmail.com"
                  className="hover:underline break-all"
                >
                  coastella.2025@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  <a
                    href="https://www.facebook.com/profile.php?id=61578909728047&mibextid=wwXIfr&rdid=1523AyOq6ApgOBmF&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F179nv48zN7%2F%3Fmibextid%3DwwXIfr#"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Facebook page"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <FacebookIcon size={20} />
                  </a>
                  <a
                    href="https://www.youtube.com/@coastella.2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our YouTube channel"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <YoutubeIcon size={20} />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <p className="font-light text-base sm:text-lg">
              © 2025 Coastella | Coastal Operations Monitoring and Alert System
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
