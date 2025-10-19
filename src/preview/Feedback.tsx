import { StarIcon } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Home Gardener',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      quote:
        "I never thought I could grow my own vegetables in my apartment. Thanks to GreenGrow's countertop system, I have fresh herbs and lettuce year-round!",
    },
    {
      name: 'Michael Chen',
      role: 'Restaurant Owner',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      quote:
        "We installed GreenGrow's commercial system in our restaurant and now grow all our own herbs and microgreens. The freshness is unmatched and our customers notice the difference.",
    },
    {
      name: 'Emma Rodriguez',
      role: 'School Teacher',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80',
      quote:
        'Our classroom hydroponic garden has been an amazing educational tool. The students are engaged and excited to learn about sustainable agriculture.',
    },
  ];

  return (
    <section
      // Inayos: Added dark:bg-gray-900 to support Dark Mode for the main section background
      className="w-full bg-[#0353A4] dark:bg-gray-900 py-16  outline-1 outline-[#959ea5] rounded-lg"
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
            // Inayos: Added dark:text-gray-100 for Dark Mode header text
            className="mb-2 text-3xl font-bold text-[#FFFFFF] dark:text-gray-100 md:text-5xl"
            // style={{ fontFamily: "'Playfair Display', serif" }}
          >
            VOICES FROM OUR COMMUNITY
          </h2>
          <p
            // Inayos: Added dark:text-gray-300 for Dark Mode paragraph text
            className="max-w-9xl text-1xl mx-auto font-light text-[#FFFFFF] dark:text-gray-300"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 100 }}
          >
            Your feedback helps us improve, innovate, and continue building
            solutions that make coastal communities safer and more resilient.
          </p>
        </div>

        <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:gap-8 md:overflow-x-visible">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              // Inayos: Added dark:bg-gray-700 for Dark Mode card background
              className="flex min-w-[88vw] snap-center flex-col rounded-lg bg-white dark:bg-gray-700 p-6 shadow-md transition-shadow duration-300 hover:shadow-lg dark:shadow-gray-900 md:min-w-0 md:snap-align-none"
            >
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    size={20}
                    // Inayos: Added dark:fill-[#453EFE] for Dark Mode star icons (using the primary color of the admin page)
                    className="fill-[#023E8A] dark:fill-[#453EFE] text-[#FFFFFF]"
                  />
                ))}
              </div>
              <p 
                // Inayos: Added dark:text-gray-100 for Dark Mode quote text
                className="montserrat mb-6 flex-1 text-lg font-light text-[#023E8A] dark:text-gray-100"
              >
                "{testimonial.quote}"
              </p>

              <div className="flex items-center">
                <div className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 
                    // Inayos: Added dark:text-white for Dark Mode name text
                    className="montserrat font-light text-[#023E8A] dark:text-white"
                  >
                    {testimonial.name}
                  </h4>
                  <p 
                    // Inayos: Added dark:text-gray-400 for Dark Mode role text
                    className="text-sm text-[#023E8A] dark:text-gray-400"
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}