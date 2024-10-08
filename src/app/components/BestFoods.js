'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { BackgroundGradient } from './ui/background-gradient';
import { useRouter } from 'next/navigation';

const cuisines = ['Indian', 'American', 'Chinese', 'Italian', 'Mexican'];

const BestFoods = () => {
  const [foods, setFoods] = useState({});
  const [loading, setLoading] = useState(true);
  const sectionRefs = useRef([]);
  const router = useRouter();

  gsap.registerPlugin(ScrollTrigger);

  // Updated gradient background from #E97415 to #00ABFE
  const gradientBackground = 'linear-gradient(135deg, #E97415, #00ABFE)';

  useEffect(() => {
    const fetchBestFoods = async () => {
      const foodData = {};
      try {
        await Promise.all(
          cuisines.map(async (cuisine) => {
            const res = await fetch(`/api/bestFoods?cuisine=${cuisine}`);
            if (!res.ok) throw new Error(`Failed to fetch foods for ${cuisine}`);
            const data = await res.json();
            foodData[cuisine] = data.slice(0, 2); // Limit to two items per cuisine
          })
        );
        setFoods(foodData);
      } catch (error) {
        console.error('Error fetching best foods:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestFoods();

    sectionRefs.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, []);

  const handleRecipeClick = (idMeal) => {
    router.push(`/recipes/${idMeal}`);
  };

  return (
    <div className="relative w-screen min-h-screen" style={{ background: gradientBackground }}>
      <div className="flex flex-col items-center w-full py-16">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-blue-300 mb-10">
          Best Foods
        </h2>

        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="loader"></div>
          </div>
        ) : (
          cuisines.map((cuisine, index) => {
            const cuisineFoods = foods[cuisine] || [];

            return (
              <div
                key={cuisine}
                ref={(el) => (sectionRefs.current[index] = el)}
                className={`w-full flex flex-col items-center justify-center py-16 px-6`}
              >
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-teal-400 mb-10">
                  {cuisine}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                  {cuisineFoods.map((food) => (
                    <div
                      key={food.idMeal}
                      className="flex items-center mb-4 shadow-lg rounded-lg bg-white p-4 transition-transform transform hover:scale-105"
                    >
                      <div className="relative cursor-pointer flex-1 flex justify-center">
                        <BackgroundGradient className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full w-full">
                          <h3 className="text-2xl font-semibold mb-4 text-black bg-opacity-80 p-2 rounded-lg backdrop-blur-md">
                            {food.strMeal}
                          </h3>
                        </BackgroundGradient>
                        <Image
                          src={food.strMealThumb}
                          alt={food.strMeal}
                          height={300}
                          width={300}
                          style={{
                            objectFit: 'cover',
                            borderRadius: '50%',
                            border: '4px solid white',
                            maxWidth: '100%',
                            height: 'auto',
                          }}
                          className="transform transition-transform duration-500 ease-in-out hover:scale-110"
                          onClick={() => handleRecipeClick(food.idMeal)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BestFoods;
