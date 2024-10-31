import Link from "next/link";
import Image from "next/image";
import { RainbowButton } from "@/components/ui/rainbow-button";

const CallToAction = () => {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 z-0">
        <Image
          className="object-cover w-full h-full"
          src="/images/cta-bg.jpg"
          alt="bg"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 container mx-auto">
        <div className="flex items-center justify-center rounded-2xl py-20 text-start md:p-20">
          <div className="mx-auto max-w-screen-md">
            <h1 className="mb-4 text-balance text-white text-3xl font-semibold md:text-5xl">
              Scale your business with us
            </h1>
            <p className="text-slate-100 text-muted-foreground md:text-lg">
              Expand your business with minimal risk with our NLP Sentiment
              Analyzer Transformers. Our funding recommendation system powered
              by LLM will help you to match with the best funding opportunities.
            </p>
            <div className="mt-11 flex flex-col justify-start gap-2 sm:flex-row">
              <RainbowButton>
                <Link href="/dashboard">Get Started!</Link>
              </RainbowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
