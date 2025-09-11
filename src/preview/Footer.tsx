import { FacebookIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white text-[#023E8A] outline-1 outline-[#959ea5] rounded-lg ">
      <div className="container mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Left Column - Brand Info */}
          <div className="space-y-4">
            <img
              src={`${import.meta.env.BASE_URL}logo/Logo.png`} 
              alt="logo"
              className="dark:hidden w-60 h-auto"
            />
            <p className="text-lg">Stay Informed, Stay Safe, Stay Ahead</p>
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
                    About Coastella
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
                  <a href="#" className="hover:underline">
                    Project Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Research Paper
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
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
                Email:{' '}
                <a
                  href="mailto:coastella.project@gmail.com"
                  className="hover:underline"
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
                  >
                    <FacebookIcon size={20} />
                  </a>
                  <a
                    href="https://www.youtube.com/@coastella.2025"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* YouTube Icon gamit lucide-react */}
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
                  {/* <a href="#">
                    <InstagramIcon size={20} />
                  </a>
                  <a href="#">
                    <TwitterIcon size={20} />
                  </a> */}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-16 border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <p className="font-light">
              © 2025 Coastella | Coastal Operations Monitoring and Alert System
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
