export default function About() {
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
            ABOUT US
          </h2>
          <p className="max-w-6xl mx-auto pt-7 text-justify text-lg leading-relaxed text-[#FFFFFF]">
            X-STREAM strategically deploys its solar-powered, IoT-based buoys in
            river areas that are vulnerable to environmental hazards. These
            buoys use multiple sensors to gather accurate, real-time data on
            water levels, rainfall, wind speed, temperatures, and humidity to
            help disaster responders, local communities, and authorities make
            informed decisions. By combining sustainable technology with early
            warning systems, we enhance disaster preparedness, enable quick
            response to potential threats, and contribute to river safety.
          </p>
        </div>
        <div className="mb-16 flex flex-col items-center gap-8 pt-10 lg:flex-row max-w-6xl mx-auto">
          <div className="lg:w-1/2">
            <div className="overflow-hidden rounded-lg shadow-xl">
              <img
                src="https://www.resinextrad.com/en/wp-content/uploads/2018/03/MAHDIA-TUNISIA-min.jpg"
                alt="Team members working on hydroponic systems"
                className="h-100 w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="flex flex-col gap-y-8">
              <p className="mb-4 text-justify text-lg leading-relaxed text-[#FFFFFF]">
                The X-STREAM Deployment Map shows the current locations of our
                active buoys along vulnerable river areas. Each site is chosen
                through hazard mapping and community consultations to ensure
                that monitoring is focused on high-risk and high-priority
                locations. By targeting these areas, we can deliver real-time
                alerts and accurate data to support disaster preparedness and
                river safety.
              </p>
              <p className="mb-4 text-justify text-lg leading-relaxed text-[#FFFFFF]">
                From site selection to full deployment, our team works to
                position each buoy where it can make the most impact. This
                network of buoys forms a reliable early warning system, helping
                communities stay informed, respond quickly, and protect lives.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="group relative flex flex-col">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-xl glass-effect p-6 shadow-lg border border-white/20 backdrop-blur-sm transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-white/40 flex flex-col flex-1">
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
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
                </div>
                <h3 className="text-xl font-bold text-[#FFFFFF] text-center transform transition-transform duration-300 group-hover:translate-y-1">
                  OUR MISSION
                </h3>
              </div>
              <p className="text-justify text-white/90 leading-relaxed text-base transform transition-all duration-300 group-hover:text-white flex-1">
                To develop a sustainable, solar-powered river monitoring and
                alert system that provides real-time data and early warnings,
                empowering disaster responders and local communities to enhance
                safety, preparedness, and response.
              </p>
            </div>
          </div>

          <div className="group relative flex flex-col">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-xl glass-effect p-6 shadow-lg border border-white/20 backdrop-blur-sm transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-white/40 flex flex-col flex-1">
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
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
                </div>
                <h3 className="text-xl font-bold text-[#FFFFFF] text-center transform transition-transform duration-300 group-hover:translate-y-1">
                  OUR VISION
                </h3>
              </div>
              <p className="text-justify text-white/90 leading-relaxed text-base transform transition-all duration-300 group-hover:text-white flex-1">
                To be the leading solution in river monitoring, creating safer
                and more resilient communities through innovative, sustainable
                technology and reliable, real-time data.
              </p>
            </div>
          </div>

          <div className="group relative flex flex-col">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative rounded-xl glass-effect p-6 shadow-lg border border-white/20 backdrop-blur-sm transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-white/40 flex flex-col flex-1">
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
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
                </div>
                <h3 className="text-xl font-bold text-[#FFFFFF] text-center transform transition-transform duration-300 group-hover:translate-y-1">
                  OUR VALUES
                </h3>
              </div>
              <p className="text-justify text-white/90 leading-relaxed text-base transform transition-all duration-300 group-hover:text-white flex-1">
                Commitment to innovation, sustainability, and community safety
                through reliable technology and collaborative partnerships that
                drive meaningful impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
