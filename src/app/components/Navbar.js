"use client"; // This component is rendered on the client side

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMoodOpen, setIsMoodOpen] = useState(false);
  const [isCuisineOpen, setIsCuisineOpen] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50); // Set true if scrolled more than 50 pixels
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cuisines = ['American', 'Chinese', 'Italian', 'Mexican', 'Indian'];

  const moods = [
    { name: 'Happy' },
    { name: 'Adventurous' },
    { name: 'Cozy' },
  ];

  const handleCuisineClick = (cuisine) => {
    router.push(`/areaFood/${cuisine}`);
    setIsCuisineOpen(false);
    setIsMoodOpen(false); // Close mood dropdown when a cuisine is selected
  };

  const handleMoodClick = (mood) => {
    router.push(`/mood/${mood.name}`);
    setIsMoodOpen(false);
    setIsCuisineOpen(false); // Close cuisine dropdown when a mood is selected
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${isScrolled ? ' shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Image Section */}
        <div className="flex items-center">
          <h1 className={`text-2xl font-bold cursor-pointer ${isScrolled ? 'text-white' : 'text-orange-400'}`} onClick={() => router.push('/')}>
            FoodMood
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => router.push('/')}
            className={`px-4 py-2 rounded-full font-bold transition-colors duration-300 ${isScrolled ? 'bg-[#00ADFD] text-white hover:bg-[#EB8425]' : 'bg-[#00ADFD] text-white hover:bg-[#EB8425]'}`}
          >
            Home
          </button>
          <button 
            onClick={() => router.push('/about')}
            className={`px-4 py-2 rounded-full font-bold transition-colors duration-300 ${isScrolled ? 'bg-[#00ADFD] text-white hover:bg-[#EB8425]' : 'bg-[#00ADFD] text-white hover:bg-[#EB8425]'}`}
          >
            About Us
          </button>
          <button 
            onClick={() => router.push('/contact')}
            className={`px-4 py-2 rounded-full font-bold transition-colors duration-300 ${isScrolled ? 'bg-[#00ADFD] text-white hover:bg-[#EB8425]' : 'bg-[#00ADFD] text-white hover:bg-[#EB8425]'}`}
          >
            Contact Us
          </button>

          {/* Mood Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsMoodOpen(!isMoodOpen);
                if (isCuisineOpen) setIsCuisineOpen(false); // Close cuisine dropdown
              }}
              className={`px-4 py-2 rounded-full font-bold transition-colors duration-300 ${isScrolled ? 'bg-[#00ADFD] text-white hover:bg-[#EB8425]' : 'bg-[#00ADFD] text-white hover:bg-[#EB8425]'}`}
            >
              Mood
            </button>
            {isMoodOpen && (
              <div className="absolute flex flex-col  rounded-md shadow-lg mt-2 py-2 right-0">
                {moods.map((mood) => (
                  <button
                    key={mood.name}
                    onClick={() => handleMoodClick(mood)}
                    className="px-8 py-3 rounded-full text-lg font-semibold text-white bg-[#00ADFD] hover:bg-[#EB8425] transition transform hover:scale-105 shadow-lg hover:shadow-xl"
                    aria-label={`Select ${mood.name} mood`}
                  >
                    {mood.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cuisine Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsCuisineOpen(!isCuisineOpen);
                if (isMoodOpen) setIsMoodOpen(false); // Close mood dropdown
              }}
              className={`px-4 py-2 rounded-full font-bold transition-colors duration-300 ${isScrolled ? 'bg-[#00ADFD] text-white hover:bg-[#EB8425]' : 'bg-[#00ADFD] text-white hover:bg-[#EB8425]'}`}
            >
              Cuisine
            </button>
            {isCuisineOpen && (
              <div className="absolute flex flex-col  rounded-md shadow-lg mt-2 py-2 right-0">
                {cuisines.map((cuisine) => (
                  <button 
                    key={cuisine}
                    onClick={() => handleCuisineClick(cuisine)}
                    className="px-8 py-3 rounded-full text-lg font-semibold text-white bg-[#00ADFD] hover:bg-[#EB8425] transition transform hover:scale-105 shadow-lg hover:shadow-xl"
                    aria-label={`Select ${cuisine} cuisine`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'transform rotate-90' : ''}`} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16m-7 6h7" 
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center bg-gray-900 bg-opacity-90 rounded-lg shadow-lg mt-4 py-4">
          <button onClick={() => router.push('/')} className="px-4 py-2 rounded-full font-bold text-white bg-[#00ADFD] hover:bg-[#EB8425] mb-2">Home</button>
          <button onClick={() => router.push('/about')} className="px-4 py-2 rounded-full font-bold text-white bg-[#00ADFD] hover:bg-[#EB8425] mb-2">About Us</button>
          <button onClick={() => router.push('/contact')} className="px-4 py-2 rounded-full font-bold text-white bg-[#00ADFD] hover:bg-[#EB8425] mb-2">Contact Us</button>
          
          {/* Mood Links */}
          <p className="text-gray-400 mt-4 mb-1">Mood</p>
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => handleMoodClick(mood)}
              className="px-8 py-3 rounded-full text-lg font-semibold text-white bg-[#00ADFD] hover:bg-[#EB8425] transition transform hover:scale-105 shadow-lg hover:shadow-xl mb-2"
              aria-label={`Select ${mood.name} mood`}
            >
              {mood.name}
            </button>
          ))}

          {/* Cuisine Links */}
          <p className="text-gray-400 mt-4 mb-1">Cuisine</p>
          {cuisines.map((cuisine) => (
            <button 
              key={cuisine} 
              onClick={() => handleCuisineClick(cuisine)}
              className="px-8 py-3 rounded-full text-lg font-semibold text-white bg-[#00ADFD] hover:bg-[#EB8425] transition transform hover:scale-105 shadow-lg hover:shadow-xl mb-2"
            >
              {cuisine}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
