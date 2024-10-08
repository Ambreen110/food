// components/HeroSection.js
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const moods = [
  { name: 'Happy' },
  { name: 'Adventurous' },
  { name: 'Cozy' },
];

const HeroSection = () => {
  const router = useRouter();

  const handleMoodClick = (mood) => {
    router.push(`/mood/${mood.name}`);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/background.jpg"
            alt="Background"
            fill
            style={{ objectFit: 'cover', filter: 'brightness(0.6)' }}
          />
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-6xl font-extrabold mb-4 text-[#E97415] drop-shadow-lg tracking-widest"
        >
          What’s Your Food Mood?
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-2xl mb-10 max-w-2xl text-white text-opacity-90 drop-shadow-md"
        >
          Select your mood, and we’ll recommend the best dishes for your vibe!
        </motion.p>

        {/* Mood Selection Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-wrap gap-6 justify-center"
        >
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => handleMoodClick(mood)}
              className="px-8 py-3 rounded-full text-lg font-semibold bg-[#00ABFE] text-white hover:bg-[#E97415] transition transform hover:scale-105 shadow-lg hover:shadow-xl"
              aria-label={`Select ${mood.name} mood`}
            >
              {mood.name}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
