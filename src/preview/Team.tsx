import { Linkedin, Twitter } from 'lucide-react';

export default function Team() {
  const teamMembers = [
    {
      name: 'VINCENT AARON DAVAC',
      role: 'LEADER',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      bio: 'Ph.D. in Agricultural Engineering with over 15 years of experience in hydroponic systems design.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'SEAN RUZZEL GONZALO',
      role: 'FRONT END DEVELOPER',
      image:
        'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      bio: 'Former NASA plant researcher specializing in closed-system agriculture and nutrient optimization.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'LUIS MARIO CARLOS',
      role: 'BACK END DEVELOPER',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      bio: 'Industrial designer with a passion for creating beautiful, functional growing systems for any space.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'ALEXIS SACRO',
      role: 'BACKEND DEVELOPER',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      bio: 'Environmental scientist focused on reducing the ecological footprint of food production systems.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'HELEN RODAS',
      role: 'UI/UX DESIGNER',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      bio: 'Environmental scientist focused on reducing the ecological footprint of food production systems.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'BERNADETTE BUMADILLA',
      role: 'RESEARCHER',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      bio: 'Environmental scientist focused on reducing the ecological footprint of food production systems.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'AIRA ANZA',
      role: 'RESEARCHER',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      bio: 'Environmental scientist focused on reducing the ecological footprint of food production systems.',
      linkedin: '#',
      twitter: '#',
    },
    {
      name: 'JOMAR ABALOS',
      role: 'HARDWARE ENGINEER',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      bio: 'Environmental scientist focused on reducing the ecological footprint of food production systems.',
      linkedin: '#',
      twitter: '#',
    },
  ];

  return (
    <section
      className="w-full bg-[#0353A4] py-16  outline-1 outline-[#959ea5] rounded-lg"
      style={{
        backgroundImage: `url('/wave.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2
            className="mb-2 text-3xl font-bold text-[#FFFFFF] md:text-5xl"
            // style={{ fontFamily: "'Playfair Display', serif" }}
          >
            MEET OUR TEAM
          </h2>
          <p className="mx-auto max-w-4xl pt-2 text-lg font-light text-[#FFFFFF] md:text-xl">
            The dedicated team of innovators behind COASTELLA, working together
            to create safer and smarter coastal communities.
          </p>
        </div>

        {/* Horizontal Scroll Wrapper - Fixed responsive widths */}
        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 snap-start overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] xl:w-[calc(25%-0.75rem)]"
            >
              <div className="aspect-[4/4] w-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl leading-tight font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="mb-4 text-sm font-medium text-gray-600">
                  {member.role}
                </p>
                <div className="flex space-x-3">
                  <a
                    href={member.linkedin}
                    className="text-[#0353A4] transition-colors duration-200 hover:text-[#39A7FF]"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={member.twitter}
                    className="text-[#0353A4] transition-colors duration-200 hover:text-[#39A7FF]"
                    aria-label={`${member.name}'s Twitter profile`}
                  >
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
