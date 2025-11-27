import React from 'react';

const CommunityPage: React.FC = () => {
  return (
    <div className="animate-fade-in pl-20 pr-10">
      {/* "What's Inside?" Section - Moved to top */}
      <section className="py-10 bg-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-5xl pt-10 md:text-6xl font-semibold text-brand-dark mb-6">What's Inside?</h1>
          <p className="max-w-3xl mx-auto text-lg text-brand-text leading-relaxed">
            The Leaders First members run the fastest growing startups in the world, across a wide array of industries. Some are bootstrapped, others venture-backed. But all our members seek to socialise and connect with only a selective group of peers.
          </p>
        </div>
      </section>

      {/* Section 1: "The Need" */}
      <section className="py-20 bg-brand-light-gray">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text content */}
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">
                THE NEED
              </p>
              <h2 className="font-sans text-5xl md:text-6xl font-extrabold text-brand-dark mb-8 leading-tight">
                Starting a company is lonely.
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                  You have to make difficult decisions every day with imperfect information on problems you've likely never faced before. It's daunting. In our experience, the best way to overcome the challenges is to learn from the wins and mistakes of others, and to <strong className="text-brand-dark">surround yourself with founders who've been there, done that.</strong>
                  </p>
                  <p>
                  Whether you're in the thick of it in Bombay or Bangalore, or you're a SaaS founder in Tier 2, <strong className="text-brand-dark">finding your people is tough.</strong>
                  </p>
              </div>
            </div>
            {/* Image */}
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" 
                alt="Founder working on a laptop by a window" 
                className="rounded-lg shadow-xl w-full max-w-md h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: "Life Changing" */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image on the left */}
            <div className="flex justify-center">
              <img 
                src="https://media.istockphoto.com/id/625741228/photo/exchanging-ideas-in-the-boardroom.jpg?s=612x612&w=0&k=20&c=_rF9PqS_sggjBVxKLtGk-Hv8_x4GrmWj3HX6VzqcqV8=" 
                alt="A group of people collaborating" 
                className="rounded-lg shadow-xl w-full max-w-lg h-auto object-cover"
              />
            </div>

            {/* Text content on the right */}
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                But when you do find them, <strong className="text-brand-dark">it's life changing.</strong> And that's what The Leaders First is for.
              </p>
              <p>
                <em className="italic">Joining The Leaders First</em> gives you immediate access to a tribe of founders and entrepreneurs who are going through the same things as you. Members consistently call it "life changing".
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
