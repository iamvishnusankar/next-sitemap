import { FC } from 'react'

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <>
      <div className="bg-neutral-200 dark:bg-slate-900  flex flex-col md:flex-row md:justify-evenly items-center p-3 border-t border-slate-300 dark:border-slate-700 text-sm font-ranadeLight">
        <div className="flex flex-row max-md:flex-col items-center">
          <p className=" px-2">
            Created by:&nbsp;
            <a
              href="https://github.com/iamvishnusankar/next-sitemap/graphs/contributors"
              target="_blank"
              className="hover:underline hover:cursor-pointer"
            >
              Vishnu Sankar & Contributors.&nbsp;
            </a>
          </p>
          <p className=" max-md:my-2 px-2">
            Font From:&nbsp;
            <a
              href="https://www.fontshare.com/"
              target="_blank"
              className="hover:underline hover:cursor-pointer"
            >
              Fontshare.&nbsp;
            </a>
          </p>
        </div>
        <div className=" flex flex-col md:flex-row items-center mb:4">
          <a
            href="https://github.com/iamvishnusankar/next-sitemap/docs"
            target="_blank"
            className="text-slate-400 hover:underline hover:cursor-pointer hover:text-neutral-200"
          >
            Website Source.&nbsp;
          </a>
        </div>
      </div>
    </>
  )
}

export default Footer
