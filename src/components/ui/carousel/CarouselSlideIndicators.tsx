import { useEffect, useState } from "preact/hooks";
import arrow from "@/assets/icons/arrow.png";

type CarouselSlideIndicatorsProps = {
  carouselId: string;
};

export default function CarouselSlideIndicators({
  carouselId,
}: CarouselSlideIndicatorsProps) {
  const [slideCount, setSlideCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToSlide = (index: number) => {
    if (index < 0 || index >= slideCount) {
      return;
    }
    const carousel = document.getElementById(carouselId);
    const viewport = carousel?.querySelector(".carousel-viewport");
    if (carousel && viewport) {
      const slideWidth = carousel.clientWidth;
      viewport.scrollTo({
        left: index * slideWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const carousel = document.getElementById(carouselId);
    const numOfSlides: number =
      carousel?.querySelectorAll(".slide").length ?? 0;
    setSlideCount(numOfSlides);
  }, [carouselId]);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const el = e.target as HTMLElement;
      const scrollLeft = el.scrollLeft;
      const slideWidth = el.clientWidth;
      setCurrentIndex(Math.round(scrollLeft / slideWidth));
    };

    const carousel = document.getElementById(carouselId);
    const viewport = carousel?.querySelector(".carousel-viewport");
    viewport?.addEventListener("scroll", handleScroll);

    return () => {
      viewport?.removeEventListener("scroll", handleScroll);
    };
  }, [carouselId]);

  return (
    <div class="mt-10 flex items-center justify-center gap-5">
      <img
        alt="Previous slide"
        src={arrow.src}
        width="36"
        onClick={() => scrollToSlide(currentIndex - 1)}
        class={`${currentIndex <= 0 ? "opacity-50" : "cursor-pointer hover:opacity-70"} mr-10`}
      />
      {Array.from({ length: slideCount }, (_, index) => (
        <div
          key={index}
          class={`carousel-dot h-2 w-2 cursor-pointer rounded-full transition-all duration-300 ease-in-out ${
            index === currentIndex ? "bg-brand" : "bg-gray-400"
          }`}
          onClick={() => scrollToSlide(index)}
        ></div>
      ))}
      <img
        alt="Next slide"
        src={arrow.src}
        width="36"
        onClick={() => scrollToSlide(currentIndex + 1)}
        class={`${currentIndex >= slideCount - 1 ? "opacity-50" : "cursor-pointer hover:opacity-70"} ml-10 rotate-180`}
      />
    </div>
  );
}
