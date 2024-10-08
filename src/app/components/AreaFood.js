import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { BackgroundGradient } from "./ui/background-gradient";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const AreaFood = ({ cuisine }) => {
  const [bestFoods, setBestFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBestFoods = async () => {
      try {
        const res = await fetch(`/api/bestFoods?cuisine=${cuisine}`);
        if (!res.ok) throw new Error(`Failed to fetch foods for ${cuisine}`);
        const data = await res.json();
        setBestFoods(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching best foods:", error); // More explicit logging
      } finally {
        setLoading(false);
      }
    };
    

    fetchBestFoods();

    const viewportWidth = window.innerWidth;

    if (viewportWidth > 768) {
      const pin = gsap.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: "-300vw",
          ease: "power2.inOut",
          duration: 2,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        }
      );

      return () => {
        pin.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [cuisine]);

  const handleMealClick = (idMeal) => {
    router.push(`/recipes/${idMeal}`);
  };

  const gradientBackgrounds = [
    "bg-gradient-to-r from-orange-400 to-blue-500",
    "bg-gradient-to-r from-purple-400 to-pink-500",
    "bg-gradient-to-r from-green-400 to-yellow-500",
    "bg-gradient-to-r from-blue-400 to-indigo-500",
  ];

  return (
    <div className="relative w-screen h-screen bg-gray-100">
      <div ref={triggerRef} className="w-screen h-[100vh]">
        <div
          ref={sectionRef}
          className="flex lg:h-[100vh] lg:w-[500vw] flex-col h-auto space-y-4 lg:space-y-0 lg:flex-row"
        >
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-lg">Loading...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-lg text-red-500">{error}</p>
            </div>
          ) : bestFoods.length > 0 ? (
            bestFoods.map((food, index) => (
              <div
                key={food.idMeal}
                className={`w-screen h-screen flex items-center justify-center relative lg:w-screen lg:h-screen py-10 rounded-lg shadow-lg ${gradientBackgrounds[index % gradientBackgrounds.length]}`}
              >
                <div
                  onClick={() => handleMealClick(food.idMeal)}
                  className="block w-full h-full cursor-pointer group transition-transform duration-500 ease-in-out"
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === "Enter" && handleMealClick(food.idMeal)}
                >
                  <BackgroundGradient className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full w-full">
                    <h3 className="text-xl font-semibold mt-32 text-center text-white bg-black bg-opacity-50 p-4 rounded-lg transition duration-300 ease-in-out group-hover:text-yellow-400">
                      {food.strMeal}
                    </h3>
                  </BackgroundGradient>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={food.strMealThumb}
                      alt={food.strMeal}
                      height={300}
                      width={300}
                      style={{
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "4px solid white",
                      }}
                      className="transition-transform duration-700 ease-in-out group-hover:rotate-6 group-hover:scale-125 transform"
                      priority
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <p>No best foods found for {cuisine || "this cuisine"}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AreaFood;
