import { useEffect, useState } from "preact/hooks";

type CarouselSlideIndicatorsProps = {
  carouselId: string;
};

export default function CarouselSlideIndicators({
  carouselId,
}: CarouselSlideIndicatorsProps) {
  const [slideCount, setSlideCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div class="mt-10 flex justify-center gap-2">
      {Array.from({ length: slideCount }, (_, index) => (
        <div
          key={index}
          class={`carousel-dot h-2 w-2 cursor-pointer rounded-full transition-all duration-300 ease-in-out ${
            index === currentIndex ? "bg-brand" : "bg-gray-400"
          }`}
          onClick={() => {
            const carousel = document.getElementById(carouselId);
            if (carousel) {
              const slideWidth = carousel.clientWidth;
              carousel.scrollTo({
                left: index * slideWidth,
                behavior: "smooth",
              });
            }
          }}
        ></div>
      ))}
    </div>
  );
}
