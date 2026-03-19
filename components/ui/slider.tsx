import { chrustyRock, galaferaMed } from "@/app/fonts";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";

interface sliderProps {
  slides: {
    id: number;
    title: string;
    image_url: string;
    description: string;
    price: number;
    highlight_text: string;
    button_text: string;
  }[];
  autoPlay?: boolean;
  autoPlayTime?: number;
}

export default function Slider({
  slides,
  autoPlay = true,
  autoPlayTime = 10000,
}: sliderProps) {
  const [current, setCurrent] = useState(0);
  const [progress, setProcess] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const nextSlide = () => {
    setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (current === 0) {
      setIsTransitioning(false);
      setCurrent(slides.length - 1);
    } else {
      setCurrent((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, autoPlayTime);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayTime, slides.length]);

  useEffect(() => {
    if (!autoPlay) return;
    setProcess(0);

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percentage = (elapsed / autoPlayTime) * 100;

      if (percentage >= 100) {
        clearInterval(interval);
        setProcess(100);
      } else {
        setProcess(percentage);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [current, autoPlay, autoPlayTime]);

  const extendedSlides =
    slides && slides.length > 0 ? [...slides, slides[0]] : [];

  useEffect(() => {
    if (current === slides.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(0);
      }, 700);
    } else {
      setIsTransitioning(true);
    }
  }, [current, slides.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden shadow-lg">
      <div className="absolute bottom-6 right-6 w-40 h-1 z-20 bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Slides Wrapper */}
      <div
        className="flex h-full"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: isTransitioning ? "transform 0.7s ease-in-out" : "none",
        }}
      >
        {Array.isArray(extendedSlides) &&
          extendedSlides.map((slide,index) => (
            <div key={`${slide.id}-${index}`} className="w-full h-full shrink-0 relative">
              <div className={`relative w-full h-full flex`}>
                <div className="absolute top-[30%] left-20 w-[90%] sm:w-1/2 z-10 text-white">
                  <h2
                    className={`${chrustyRock.className} text-3xl sm:text-5xl md:text-6xl leading-tight`}
                  >
                    {slide?.title}
                    <br />
                    <span className="text-orange-500 text-xl md:text-4xl">
                      {slide?.highlight_text}
                    </span>
                  </h2>

                  <p
                    className={`font(--font-inter) text-xl font-medium text-white w-100 mb-2`}
                  >
                    {slide?.description}
                  </p>
                  <p
                    className={`${galaferaMed.className} italic font(--font-inter) text-white font-medium text-3xl`}
                  >
                    Price: {slide?.price}
                  </p>
                </div>
                <img
                  src={slide?.image_url}
                  alt={slide?.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
      </div>

      <button
        title="prevSlide"
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 transition p-2 sm:p-3 rounded-full"
      >
        <ChevronLeftIcon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
      </button>

      <button
        title="nextSlide"
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 transition p-2 sm:p-3 rounded-full"
      >
        <ChevronRightIcon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
      </button>
    </div>
  );
}
