const Footer = () => {
  return (
    <>
      <div className="flex flex-col items-center p-3 text-sm border-t bg-neutral-200 dark:bg-slate-900 md:flex-row md:justify-evenly border-slate-300 dark:border-slate-700 font-ranadeLight">
        <div className="flex flex-row items-center max-md:flex-col">
          <p className="px-2 ">
            Created by:&nbsp;
            <a
              href="https://github.com/iamvishnusankar/next-sitemap/graphs/contributors"
              target="_blank"
              className="hover:underline hover:cursor-pointer"
              rel="noopener noreferrer"
            >
              Vishnu Sankar & Contributors.&nbsp;
            </a>
          </p>
          <p className="px-2  max-md:my-2">
            Font From:&nbsp;
            <a
              href="https://www.fontshare.com/"
              target="_blank"
              className="hover:underline hover:cursor-pointer"
              rel="noopener noreferrer"
            >
              Fontshare.&nbsp;
            </a>
          </p>
        </div>
        <div className="flex flex-col items-center  md:flex-row mb:4">
          <a
            href="https://github.com/iamvishnusankar/next-sitemap/tree/master/docs"
            target="_blank"
            className="text-slate-400 hover:underline hover:cursor-pointer hover:text-neutral-200"
            rel="noopener noreferrer"
          >
            Website Source.&nbsp;
          </a>
        </div>
      </div>
    </>
  )
}

export default Footer
