export default function About() {
  return (
    // **Dark Mode:** Changed the fixed blue background to a combination of blue for light mode 
    // and a darker gray for dark mode.
    <section
      className="w-full bg-[#0353A4] py-16 outline-1 outline-[#959ea5] rounded-lg dark:bg-gray-900 transition-colors duration-300"
      style={{
        backgroundImage: `url('${import.meta.env.BASE_URL}wave.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-2 text-center">
          {/* **Dark Mode Text:** White text for both light and dark backgrounds */}
          <h2 className="mb-2 text-3xl font-bold text-[#FFFFFF] md:text-5xl">
            ABOUT US
          </h2>
          {/* **Dark Mode Text:** White text for both light and dark backgrounds */}
          <p className="max-w-9xl mx-auto pt-7 text-justify text-xl leading-relaxed text-[#FFFFFF]">
            COASTELLA strategically deploys its solar-powered, IoT-based buoys
            in coastal areas that are most vulnerable to environmental hazards.
            These buoys gather accurate, real-time data on water levels, wind
            speed, wave activity, and water quality to help communities,
            authorities, and stakeholders make informed decisions. By combining
            sustainable technology with early warning systems, we strengthen
            disaster preparedness, protect lives, and contribute to the
            preservation of our marine environment.
          </p>
        </div>
        
        <div className="mb-16 flex flex-col items-center gap-8 pt-10 lg:flex-row">
          {/* Mission Card */}
          <div className="rounded-lg bg-[#FFFFFF] p-6 shadow-md dark:bg-gray-800 dark:shadow-xl transition-colors duration-300">
            {/* **Dark Mode Text:** Blue in light mode, lighter blue/gray in dark mode */}
            <h3 className="mb-2 text-center text-3xl font-bold text-[#023E8A] dark:text-blue-400">
              OUR MISSION
            </h3>
            {/* **Dark Mode Text:** Blue in light mode, lighter blue/gray in dark mode */}
            <p className="pt-4 text-justify text-xl leading-relaxed text-[#023E8A] dark:text-gray-300">
              To provide a sustainable, solar-powered coastal monitoring and
              alert system that delivers real-time data and early warnings,
              empowering communities and authorities to enhance safety, disaster
              preparedness, and marine preservation.
            </p>
          </div>
          
          {/* Vision Card */}
          <div className="rounded-lg bg-[#FFFFFF] p-6 shadow-md dark:bg-gray-800 dark:shadow-xl transition-colors duration-300">
            {/* **Dark Mode Text:** Blue in light mode, lighter blue/gray in dark mode */}
            <h3 className="mb-2 text-center text-3xl font-bold text-[#023E8A] dark:text-blue-400">
              OUR VISION
            </h3>
            {/* **Dark Mode Text:** Blue in light mode, lighter blue/gray in dark mode */}
            <p className="pt-4 text-justify text-xl leading-relaxed text-[#023E8A] dark:text-gray-300">
              To provide a sustainable, solar-powered coastal monitoring and
              alert system that delivers real-time data and early warnings,
              empowering communities and authorities to enhance safety, disaster
              preparedness, and marine preservation.
            </p>
          </div>
          
          {/* Values Card */}
          <div className="rounded-lg bg-[#FFFFFF] p-6 shadow-md dark:bg-gray-800 dark:shadow-xl transition-colors duration-300">
            {/* **Dark Mode Text:** Blue in light mode, lighter blue/gray in dark mode */}
            <h3 className="mb-2 text-center text-3xl font-bold text-[#023E8A] dark:text-blue-400">
              OUR VALUES
            </h3>
            {/* **Dark Mode Text:** Blue in light mode, lighter blue/gray in dark mode */}
            <p className="pt-4 text-justify text-xl leading-relaxed text-[#023E8A] dark:text-gray-300">
              To provide a sustainable, solar-powered coastal monitoring and
              alert system that delivers real-time data and early warnings,
              empowering communities and authorities to enhance safety, disaster
              preparedness, and marine preservation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}