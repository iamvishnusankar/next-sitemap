import { FC } from "react";

interface SocialIconsProps {}

const SocialIcons: FC<SocialIconsProps> = ({}) => {
  return (
    <>
      <div className="flex ">
        {" "}
        <a
          href="https://github.com/iamvishnusankar/next-sitemap"
          target="_blank"
          className="px-3 pt-[6px] transition-all text-slate-950 hover:text-slate-900 dark:rotate-0 dark:scale-100 dark:text-slate-400 dark:hover:text-slate-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-github"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
        </a>
        <a
          href="https://www.npmjs.com/package/next-sitemap"
          target="_blank"
          className="px-3 pt-[6px] transition-all text-slate-950 hover:text-slate-900 dark:rotate-0 dark:scale-100 dark:text-slate-400 dark:hover:text-slate-100"
        >
          npm
        </a>
      </div>
    </>
  );
};

export default SocialIcons;
