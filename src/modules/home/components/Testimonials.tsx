import Autoplay from "embla-carousel-autoplay";
import React from "react";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { TESTIMONIALS } from "../constants/testimonials";

const Testimonials: React.FC = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );

  return (
    <div className="py-5 sm:py-10 w-full">
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">
          Trusted by Football Analysts Worldwide
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-primary-gray max-w-2xl mx-auto text-center">
          Real feedback from users who rely on ProBetPredictions for match
          statistics, team insights, and data-driven football analysis.
        </p>
      </div>

      <Carousel
        plugins={[plugin.current]}
        className="max-w-full w-full mx-auto"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="">
          {TESTIMONIALS.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="basis-full md:basis-1/2 lg:basis-1/3"
            >
              <Card className="group h-full rounded-xl border-primary-neon/20 backdrop-blur transition-all duration-300">
                <div className="py-0 px-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center border border-primary-neon/20 group-hover:border-primary-neon/60 group-hover:bg-primary-neon/10">
                      <span className="text-primary-neon font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold group-hover:text-primary-neon">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-primary-gray group-hover:text-primary-neon/80">
                        {testimonial.country}
                      </p>
                    </div>
                  </div>

                  <p className="text-primary-gray italic leading-relaxed transition-colors duration-300 group-hover:text-gray-200">
                    &ldquo;{testimonial.feedback}&rdquo;
                  </p>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-6 relative flex justify-center items-center gap-4">
          <CarouselPrevious variant="neon" className="relative" />
          <CarouselNext variant="neon" className="relative" />
        </div>
      </Carousel>
    </div>
  );
};

export default Testimonials;
