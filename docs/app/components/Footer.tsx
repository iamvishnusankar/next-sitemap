import { FC } from 'react'

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <>
      <div className="bg-neutral-200 dark:bg-slate-900  flex flex-col md:flex-row justify-evenly items-center p-3 border-t border-slate-300 dark:border-slate-700 text-sm">
        <div className="flex flex-row max-md:flex-col">
          <p className=" px-2">
            Created by:&nbsp;
            <a
              href="https://iamvishnusankar.com"
              target="_blank"
              className="hover:underline hover:cursor-pointer"
            >
              Vishnu Sankar.&nbsp;
            </a>
          </p>
          <p className=" max-md:my-2 px-2">
            Website Created by:&nbsp;
            <a
              href="https://shreyas-chaliha.vercel.app"
              target="_blank"
              className="hover:underline hover:cursor-pointer"
            >
              Trace.&nbsp;
            </a>
          </p>
        </div>
        <div className=" flex flex-row">
          Source: &nbsp;
          <a
            href="https://github.com/iamvishnusankar/next-sitemap"
            target="_blank"
            className="hover:underline hover:cursor-pointer"
          >
            Package.&nbsp;
          </a>
          <p className="hover:underline hover:cursor-pointer px-2">
            <a
              href=" https://github.com/trace2798/website"
              target="_blank"
              className="hover:underline hover:cursor-pointer"
            >
              Website.&nbsp;
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Footer
