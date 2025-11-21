import { useRef } from "react";
import { Linkedin, Twitter } from "lucide-react";

export default function Team() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const teamMembers = [
    {
      name: "VINCENT AARON DAVAC",
      role: "LEADER",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      bio: "Ph.D. in Agricultural Engineering with over 15 years of experience in hydroponic systems design.",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "SEAN RUZZEL GONZALO",
      role: "FRONT END DEVELOPER",
      image:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      bio: "Former NASA plant researcher specializing in closed-system agriculture and nutrient optimization.",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "LUIS MARIO CARLOS",
      role: "BACK END DEVELOPER",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      bio: "Industrial designer with a passion for creating beautiful, functional growing systems for any space.",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "ALEXIS SACRO",
      role: "BACKEND DEVELOPER",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      bio: "Environmental scientist focused on reducing the ecological footprint of food production systems.",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "HELEN RODAS",
      role: "UI/UX DESIGNER",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      bio: "Environmental scientist focused on reducing the ecological footprint of food production systems.",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "BERNADETTE BUMADILLA",
      role: "RESEARCHER",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      bio: "Environmental scientist focused on reducing the ecological footprint of food production systems.",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "AIRA ANZA",
      role: "RESEARCHER",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      bio: "Environmental scientist focused on reducing the ecological footprint of food production systems.",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "JOMAR ABALOS",
      role: "HARDWARE ENGINEER",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      bio: "Environmental scientist focused on reducing the ecological footprint of food production systems.",
      linkedin: "#",
      twitter: "#",
    },
  ];
  return (
    <section className="w-full py-16 relative">
      {/* Custom CSS */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

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
            MEET OUR TEAM
          </h2>
          <p className="mx-auto max-w-4xl pt-2 text-lg font-light text-white md:text-xl">
            The dedicated team of innovators behind X-STREAM, working together
            to create safer and smarter coastal communities.
          </p>
        </div>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-2 pb-4 hide-scrollbar"
          onMouseDown={(e) => {
            isDragging.current = true;
            startX.current = e.pageX - scrollRef.current!.offsetLeft;
            scrollLeft.current = scrollRef.current!.scrollLeft;
          }}
          onMouseLeave={() => (isDragging.current = false)}
          onMouseUp={() => (isDragging.current = false)}
          onMouseMove={(e) => {
            if (!isDragging.current) return;
            e.preventDefault();
            const x = e.pageX - scrollRef.current!.offsetLeft;
            const walk = x - startX.current;
            scrollRef.current!.scrollLeft = scrollLeft.current - walk;
          }}
          style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative w-full flex-shrink-0 snap-start overflow-hidden transition-all duration-300 hover:-translate-y-1 
             sm:w-[calc(45%-0.5rem)] lg:w-[calc(30%-0.75rem)] xl:w-[calc(25%-0.75rem)]"
            >
              <div className="relative rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-lg flex flex-col h-full">
                <div className="aspect-[4/4] w-full overflow-hidden flex-shrink-0 rounded-t-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="relative p-4 flex flex-col flex-1 min-h-[120px]">
                  <div className="absolute -inset-x-1 inset-y-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

                  <div className="relative z-10">
                    <h3 className="text-lg leading-tight font-semibold text-white mb-1 line-clamp-2 min-h-[2.5rem] flex items-center">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-white/80 mb-3 flex-shrink-0">
                      {member.role}
                    </p>
                    <div className="flex space-x-3 mt-auto">
                      <a
                        href={member.linkedin}
                        className="text-white/80 transition-colors duration-200 hover:text-white"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <Linkedin size={18} />
                      </a>
                      <a
                        href={member.twitter}
                        className="text-white/80 transition-colors duration-200 hover:text-white"
                        aria-label={`${member.name}'s Twitter profile`}
                      >
                        <Twitter size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
