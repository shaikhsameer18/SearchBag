import React, { useState, useEffect, useCallback } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Add image preloading function
const preloadImages = (imageSources) => {
  imageSources.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const HeaderSlider = () => {
  const router = useRouter();
  const sliderData = [
    {
      id: 1,
      title: "LUXURY TRAVEL COMPANIONS",
      subtitle: "Elevate Your Journey with Premium Travel Bags",
      offer: "NEW COLLECTION",
      buttonText1: "SHOP NOW",
      buttonText2: "LEARN MORE",
      imgSrc: assets.product,
      bgColor: "bg-gradient-to-r from-teal-800 to-teal-900",
      textColor: "text-stone-100",
      accentColor: "text-teal-300",
      graphicColor: "bg-teal-400",
    },
    {
      id: 2,
      title: "STUDENT ESSENTIAL SERIES",
      subtitle: "Smart Design Meets Ultimate Durability",
      offer: "BACK TO SCHOOL",
      buttonText1: "EXPLORE COLLECTION",
      buttonText2: "VIEW DETAILS",
      imgSrc: assets.student,
      bgColor: "bg-gradient-to-r from-teal-700 to-teal-800",
      textColor: "text-stone-100",
      accentColor: "text-teal-200",
      graphicColor: "bg-teal-300",
    },
    {
      id: 3,
      title: "BUSINESS & PROFESSIONAL",
      subtitle: "Sophisticated Bags for the Modern Professional",
      offer: "PREMIUM LEATHER",
      buttonText1: "DISCOVER NOW",
      buttonText2: "CONTACT US",
      imgSrc: assets.business,
      bgColor: "bg-gradient-to-r from-stone-900 to-stone-800",
      textColor: "text-stone-100",
      accentColor: "text-teal-400",
      graphicColor: "bg-teal-500",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative overflow-hidden w-full rounded-2xl shadow-soft h-[500px] md:h-[600px]">
      {sliderData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 ${
            slide.bgColor
          } flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-8 ${
            slide.textColor
          } transition-opacity duration-700 ${
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div
              className={`absolute top-10 left-10 w-20 h-20 rounded-full ${slide.graphicColor}`}
            ></div>
            <div
              className={`absolute bottom-20 right-20 w-16 h-16 rounded-full ${slide.graphicColor}`}
            ></div>
            <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-[#ffffff30] rounded-full"></div>
          </div>

          <div className="md:w-1/2 space-y-5 text-center md:text-left z-10 mt-6 md:mt-0">
            <p className="bg-white/10 backdrop-blur-sm border border-white/20 inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-[0.2em] font-body">
              {slide.offer}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight leading-snug mt-4">
              {slide.title.split(" ").map((word, i) => (
                <React.Fragment key={i}>
                  {i === 1 ? (
                    <span className={`${slide.accentColor} font-bold`}>
                      {word}{" "}
                    </span>
                  ) : (
                    `${word} `
                  )}
                </React.Fragment>
              ))}
            </h1>
            <p className="text-base md:text-lg lg:text-xl opacity-90 font-body max-w-md mt-3">
              {slide.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center md:justify-start">
              <button
                onClick={() => router.push("/all-products")}
                className="bg-teal-500 hover:bg-teal-400 text-stone-900 px-6 py-2.5 rounded-full transition duration-300 text-sm font-medium shadow-soft hover:shadow-hover font-body"
              >
                {slide.buttonText1}
              </button>
              <button
                onClick={() => router.push("/about")}
                className="bg-transparent border-2 border-white/50 hover:border-white px-6 py-2.5 rounded-full transition duration-300 text-sm font-medium font-body"
              >
                {slide.buttonText2}
              </button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center items-center z-10">
            <div className="relative w-full max-w-[500px] aspect-square">
              <Image
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex items-center justify-center gap-2 absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-1.5 w-6 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === index ? "bg-teal-500 w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          handleSlideChange(
            (currentSlide - 1 + sliderData.length) % sliderData.length
          )
        }
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm p-2.5 rounded-full hover:bg-white/20 transition duration-300 z-20"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={() =>
          handleSlideChange((currentSlide + 1) % sliderData.length)
        }
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm p-2.5 rounded-full hover:bg-white/20 transition duration-300 z-20"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default HeaderSlider;
