'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const cuisines = ['Indian', 'American', 'Chinese', 'Italian', 'Mexican'];

const BestFoods = () => {
  const [foods, setFoods] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBestFoods = async () => {
      const foodData = {};
      try {
        await Promise.all(
          cuisines.map(async (cuisine) => {
            const res = await fetch(`/api/bestFoods?cuisine=${cuisine}`);
            if (!res.ok) throw new Error(`Failed to fetch foods for ${cuisine}`);
            const data = await res.json();
            foodData[cuisine] = data;
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
  }, []);

  const handleRecipeClick = (idMeal) => {
    router.push(`/recipes/${idMeal}`);
  };

  return (
    <div className="relative w-screen min-h-screen overflow-y-scroll gradient-background flex flex-col items-center">
      <h2 className="text-white text-4xl font-extrabold mb-8 text-center pt-8 shadow-md">
        Best Foods
      </h2>

      <div className="flex flex-col w-full">
        {cuisines.map((cuisine, index) => {
          const cuisineFoods = foods[cuisine] || [];
          const randomFood = cuisineFoods[Math.floor(Math.random() * cuisineFoods.length)];

          return (
            <motion.div
              key={cuisine}
              className="relative w-full h-screen flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {loading ? (
                <p className="text-lg text-black">Loading...</p>
              ) : randomFood ? (
                <motion.div
                  className={`w-full h-full cursor-pointer flex flex-col-reverse lg:flex-row ${
                    index % 2 === 0 ? 'flex-row-reverse' : ''
                  }`}
                  onClick={() => handleRecipeClick(randomFood.idMeal)}
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 10 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className={`relative flex-1 z-20 p-8 text-white ${
                      index % 2 === 0 ? 'text-left' : 'text-right'
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <div className="bg-black bg-opacity-50 p-4 rounded-lg">
                      <h3 className="text-4xl font-bold text-orange-500 shadow-lg">
                        {randomFood.strMeal}
                      </h3>
                      <p className="text-xl text-[#00ADFD]">{cuisine}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="relative flex-1 z-10"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7 }}
                  >
                    <Image
                      src={randomFood.strMealThumb}
                      alt={randomFood.strMeal}
                      height={400}
                      width={400}
                      style={{
                        objectFit: 'cover',
                        borderRadius: '50%',
                        border: '6px solid white',
                      }}
                      className="transition-opacity duration-500 ease-in-out"
                      priority
                    />
                  </motion.div>
                </motion.div>
              ) : (
                <p className="text-lg text-white">No food found for {cuisine}</p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BestFoods;
