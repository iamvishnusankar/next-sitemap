import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { buttonVariants } from "./blocks/Button";
import SocialIcons from "./blocks/SocialIcons";

const Navbar = async () => {
  return (
    <div className="fixed backdrop-blur-sm bg-neutral-200 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center font-satoshiBold">
        <div>
          <Link href="/" className={buttonVariants({ variant: "link" })}>
            next-sitemap
          </Link>

          <Link
            href="/documentation"
            className={buttonVariants({ variant: "link" })}
          >
            Documentation
          </Link>
          <Link
            href="/examples"
            className={buttonVariants({ variant: "link" })}
          >
            Example
          </Link>
        </div>
        <div className="md:hidden flex">
          <SocialIcons />
          <ThemeToggle />
        </div>

        <div className="hidden md:flex gap-4">
          <SocialIcons />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
