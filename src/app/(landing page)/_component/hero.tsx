import { squareBackgroundSVG } from "./squareBackground";
import Bento from "@/components/bento";
import SparklesText from "@/components/ui/sparkles-text";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto flex flex-col items-center">
        <div className="absolute inset-x-0 top-0 z-10 flex size-full items-center justify-center opacity-100">
          {squareBackgroundSVG}
        </div>
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="z-10 flex flex-col items-center gap-6 text-center">
            <div className="mb-6 text-center">
              <h1 className="mb-6 text-pretty text-2xl font-bold lg:text-5xl relative flex flex-wrap items-baseline justify-center">
                <SparklesText
                  className="inline-block m-0 p-0 text-2xl lg:text-5xl"
                  text="AI Business Advisor"
                />
                <span className="inline-block m-0 pl-2">
                  for SMEs to help with scaling your business
                </span>
              </h1>
              <p className="text-muted-foreground lg:text-lg">
                Empowering SMEs with AI-driven insights to analyze market
                performance, score the current economy, and match with the best
                funding opportunities.
              </p>
            </div>

            <div className="mb-16 py-2">
              <Bento />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
