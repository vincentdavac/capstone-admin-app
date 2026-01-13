/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { Linkedin, Twitter } from "lucide-react";
import API_BASE_URL from "../config/coreApi";
import { AppContext } from "../context/AppContext";

export interface TeamData {
  id: number;
  attributes: {
    userName: string;
    role: string;
    image: string;
    facebookLink: string | null;
    twitterLink: string | null;
    linkedinLink: string | null;
    instagramLink: string | null;
    isArchived: boolean;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

interface Props {
  refresh?: boolean;
}

export default function Team({ refresh }: Props) {
  const { token } = useContext(AppContext)!;
  const [loading, setLoading] = useState(true);

  const [teamMembers, setTeamMembers] = useState<TeamData[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Fetch Active Team Members
  const fetchActiveTeams = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/active-teams`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (res.ok && data.data) {
        setTeamMembers(data.data);
      }
    } catch (err) {
      console.error("Error fetching active teams:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveTeams();
  }, [refresh]);

  if (loading) {
    return (
      <section className="w-full py-16 flex justify-center items-center">
        <div className="flex justify-center items-center gap-2 text-gray-500">
          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
          Loading Team...
        </div>{" "}
      </section>
    );
  }

  return (
    <section className="w-full py-16 relative">
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
          <p className="mx-auto max-w 6xl pt-2 text-lg font-light text-white md:text-xl">
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
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group relative w-full flex-shrink-0 snap-start overflow-hidden transition-all duration-300 hover:-translate-y-1 
              sm:w-[calc(45%-0.5rem)] lg:w-[calc(30%-0.75rem)] xl:w-[calc(25%-0.75rem)]"
            >
              <div className="relative rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm shadow-lg flex flex-col h-full">
                <div className="aspect-[4/4] w-full overflow-hidden flex-shrink-0 rounded-t-xl">
                  <img
                    src={member.attributes.image}
                    alt={member.attributes.userName}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="relative p-4 flex flex-col flex-1 min-h-[120px]">
                  <div className="absolute -inset-x-1 inset-y-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>

                  <div className="relative z-10">
                    <h3 className="text-lg leading-tight font-semibold text-white mb-1 line-clamp-2 min-h-[2.5rem] flex items-center">
                      {member.attributes.userName}
                    </h3>
                    <p className="text-sm font-medium text-white/80 mb-3 flex-shrink-0">
                      {member.attributes.role}
                    </p>

                    <div className="flex space-x-3 mt-auto">
                      {member.attributes.linkedinLink && (
                        <a
                          href={member.attributes.linkedinLink}
                          target="_blank"
                          className="text-white/80 transition-colors duration-200 hover:text-white"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                      {member.attributes.twitterLink && (
                        <a
                          href={member.attributes.twitterLink}
                          target="_blank"
                          className="text-white/80 transition-colors duration-200 hover:text-white"
                        >
                          <Twitter size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {teamMembers.length === 0 && (
            <p className="text-white text-center w-full">
              No active team members found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
