'use client';

import Image from 'next/image';

const benefits = [
  {
    title: 'iPhone Upload Simulation',
    description: "Boost your TikTok reach by making the platform think you're uploading from an iPhone, known to receive preferential treatment in the algorithm.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: 'Enhanced Video Quality',
    description: 'Maintain higher video quality through smart compression and device-specific optimization techniques that preserve clarity.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )
  },
  {
    title: 'Algorithm-Friendly Metadata',
    description: 'Optimize your content with device signatures that are proven to boost visibility across TikTok, Instagram, and other platforms.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    title: 'Cross-Platform Optimization',
    description: "Automatically adjust video parameters for each social platform's preferences, ensuring maximum engagement potential.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    )
  },
  {
    title: 'Premium Device Signatures',
    description: 'Utilize signatures from high-end devices known to receive preferential treatment in social media algorithms.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    )
  },
  {
    title: 'Smart Format Conversion',
    description: 'Automatically convert your videos to the most optimal format for each platform while maintaining the highest possible quality.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    )
  }
];

export default function Benefits() {
  return (
    <section className="py-24 bg-white" id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose VideoMask
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Unlock the full potential of your social media content with our advanced video optimization technology
          </p>
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center p-[2px] rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x hover:from-pink-400 hover:via-purple-400 hover:to-blue-400 transition-all duration-500">
              <div className="inline-flex items-center px-2 py-2 rounded-full bg-white">
                <span className="px-4 py-2 text-sm font-medium text-gray-700">
                  Optimized for
                </span>
                <div className="flex items-center space-x-4 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" 
                      alt="TikTok" 
                      className="h-12 w-12 opacity-80 hover:opacity-100 transition-opacity" 
                    />
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" 
                      alt="Instagram" 
                      className="h-8 w-8 opacity-80 hover:opacity-100 transition-opacity" 
                    />
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" 
                      alt="YouTube" 
                      className="h-8 w-8 opacity-80 hover:opacity-100 transition-opacity" 
                    />
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg" 
                      alt="Twitter" 
                      className="h-8 w-8 opacity-80 hover:opacity-100 transition-opacity" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border-2 border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
