// This template requires the Embla Auto Scroll plugin to be installed:
//
// npm install embla-carousel-auto-scroll

"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const logos = [
  {
    id: "logo-1",
    description: "SSM",
    image:
      "https://accounting.my/wp-content/uploads/2023/05/SSM-Logo-1024x565.webp",
  },
  {
    id: "logo-2",
    description: "PADU",
    image:
      "https://www.melaka.gov.my/images/artikel/pengumuman/20240104_padu/logo_padu.png",
  },
  {
    id: "logo-3",
    description: "LHDN",
    image:
      "https://upload.wikimedia.org/wikipedia/ms/thumb/4/4e/LHDN_logo.png/1200px-LHDN_logo.png",
  },
  {
    id: "logo-4",
    description: "Cradle",
    image:
      "https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/v1495765626/byljuxgecdrsm4giigxt.png",
  },
  {
    id: "logo-5",
    description: "Sidec",
    image: "https://businesshr.asia/wp-content/uploads/2021/04/SIDEC-Logo.png",
  },
  {
    id: "logo-6",
    description: "CTOS",
    image: "https://leeshih.com/wp-content/uploads/2016/02/new_ctos.png",
  },
  {
    id: "logo-7",
    description: "Fikra ACE",
    image: "/other-logos/fikraace.png",
  },
  {
    id: "logo-8",
    description: "Teraja Peneraju Bumiputera",
    image: "/other-logos/peneraju.svg",
  },
];

const CompaniesLogo = () => {
  return (
    <section>
      <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-white bg-background md:shadow-xl">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h1 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">
            Future Partnerships & Collaboration
          </h1>
        </div>
        <div className="pt-10 md:pt-16 lg:pt-20">
          <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
            <Carousel
              opts={{ loop: true }}
              plugins={[AutoScroll({ playOnInit: true })]}
            >
              <CarouselContent className="ml-0">
                {logos.map((logo) => (
                  <CarouselItem
                    key={logo.id}
                    className="basis-1/3 pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                  >
                    <div className="mx-10 flex shrink-0 items-center justify-center">
                      <div>
                        <img
                          src={logo.image}
                          alt={logo.description}
                          className="h-11 w-auto"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />
      </div>
    </section>
  );
};

export default CompaniesLogo;
