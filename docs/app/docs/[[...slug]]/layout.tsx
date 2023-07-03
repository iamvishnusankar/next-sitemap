import { docsConfig } from '@/config/docs'
import { DocsSidebarNav } from '@/app/components/sidebar-nav'
import But from '@/app/components/docsMenu/But'

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <>
      <div className="flex-1 md:grid md:grid-cols-[180px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 pt-12 md:pt-24 lg:pt-16 border-b bg-background bg-neutral-200 dark:bg-slate-900">
        <But />
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-slate-800 dark:border-neutral-300 py-6 pr-2 md:sticky md:block lg:py-10 md:ml-[4vw] 2xl:ml-[10vw]">
          <DocsSidebarNav items={docsConfig.sidebarNav} />
        </aside>
        <div className="mx-[5vw] md:mx-[5vw] 2xl:mx-[10vw]">{children}</div>
      </div>
    </>
  )
}
