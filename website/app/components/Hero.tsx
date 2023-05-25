"use client";
import { FC } from "react";
import CodeCopyButton from "./CodeCopyButton";
import { Button } from "./blocks/Button";
import Icons from "./Icons";

interface HeroProps {}

const Hero: FC<HeroProps> = ({}) => {
  return (
    <>
      <main className="flex bg-neutral-200 dark:bg-slate-900 relative min-h-[94.5vh] max-w-screen overflow-hidden flex-col items-center justify-center p-8 xl:p-24 max-md:mt-16">
        <div className="lg:mx-[20vw] text-center flex flex-col items-center">
          <div className="border border-slate-500 dark:bg-slate-800 rounded-xl w-fit p-1 px-3 text-sm capitalize">
            Sitemap generator for Next.js application
          </div>
          <h1 className="mt-3 font-bold text-4xl lg:text-6xl dark:bg-gradient-to-tl dark:from-indigo-900 dark:to-purple-500 bg-clip-text text-transparent bg-gradient-to-bl from-slate-900 to-gray-500">
            Effortlessly generate sitemaps and robots.txt for your Next.js
            application
          </h1>
          <h2 className="mx-[10vw] mt-5 text-base md:text-xl text-gray-600 dark:text-gray-400">
            Generate sitemap(s) and robots.txt for all
            static/pre-rendered/dynamic/server-side pages.
          </h2>

          <div className="flex flex-col md:flex-row justify-evenly mt-7 mx-[10vw] w-3/4">
            <Button className="max-md:mb-10">
              Explore Documentation <Icons.ArrowRight className="h-4" />
            </Button>
            <CodeCopyButton> npm i next-sitemap </CodeCopyButton>
          </div>
        </div>
      </main>
    </>
  );
};

export default Hero;
