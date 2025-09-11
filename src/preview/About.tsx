export default function About() {
  return (
    <section
      className="w-full bg-[#0353A4] py-16  outline-1 outline-[#959ea5] rounded-lg "
      style={{
        backgroundImage: `url('${import.meta.env.BASE_URL}wave.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-2 text-center">
          <h2 className="mb-2 text-3xl font-bold text-[#FFFFFF] md:text-5xl">
            ABOUT US
          </h2>
          <p className="max-w-9xl mx-auto pt-7 text-justify text-xl  leading-relaxed text-[#FFFFFF]">
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
          <div className="lg:w-1/2">
            <div className="overflow-hidden rounded-lg shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Team members working on hydroponic systems"
                className="h-100 w-full object-cover"
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="flex flex-col gap-y-8">
              <p className="mb-4 max-w-4xl text-justify text-xl leading-relaxed text-[#FFFFFF]">
                The COASTELLA Deployment Map shows the current locations of our
                active buoys along vulnerable coastal areas. Each site is chosen
                through hazard mapping and community consultations to ensure
                that monitoring is focused on high-risk and high-priority
                locations. By targeting these areas, we can deliver real-time
                alerts and accurate data to support disaster preparedness and
                coastal safety.
              </p>
              <p className="mb-4 max-w-4xl text-justify text-xl leading-relaxed text-[#FFFFFF]">
                From site selection to full deployment, our team works to
                position each buoy where it can make the most impact. This
                network of buoys forms a reliable early warning system, helping
                communities stay informed, respond quickly, and protect both
                lives and marine environments.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-[#FFFFFF] p-6 shadow-md">
            <h3 className="mb-2 text-center text-3xl font-bold text-[#023E8A]">
              OUR MISSION
            </h3>
            <p className="pt-4 text-justify text-xl leading-relaxed text-[#023E8A]">
              To provide a sustainable, solar-powered coastal monitoring and
              alert system that delivers real-time data and early warnings,
              empowering communities and authorities to enhance safety, disaster
              preparedness, and marine preservation.
            </p>
          </div>
          <div className="rounded-lg bg-[#FFFFFF] p-6 shadow-md">
            <h3 className="mb-2 text-center text-3xl font-bold text-[#023E8A]">
              OUR VISION
            </h3>
            <p className="pt-4 text-justify text-xl leading-relaxed text-[#023E8A]">
              To provide a sustainable, solar-powered coastal monitoring and
              alert system that delivers real-time data and early warnings,
              empowering communities and authorities to enhance safety, disaster
              preparedness, and marine preservation.
            </p>
          </div>
          <div className="rounded-lg bg-[#FFFFFF] p-6 shadow-md">
            <h3 className="mb-2 text-center text-3xl font-bold text-[#023E8A]">
              OUR VALUES
            </h3>
            <p className="pt-4 text-justify text-xl leading-relaxed text-[#023E8A]">
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
