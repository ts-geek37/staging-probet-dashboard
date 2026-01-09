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
    <div className="py-12 w-full">
      <h2 className="text-2xl font-bold w-full text-white mb-8 text-center">
        What Our Users Say
      </h2>

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
              <Card className="justify-between h-full rounded-xl border-primary-neon/20 backdrop-blur transition-all">
                <div className="py-0 px-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center border border-primary-neon/20">
                      <span className="text-primary-neon font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {testimonial.country}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic leading-relaxed">
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
