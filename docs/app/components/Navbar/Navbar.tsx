'use client'
import React, { useState, useCallback, useEffect } from 'react'
import MobileMenu from './MobileMenu'
import MenuItem from './NavbarItem'
import { useRouter } from 'next/navigation'

import { Menu } from 'lucide-react'
import SocialIcons from '../blocks/SocialIcons'
import { ThemeToggle } from '../ThemeToggle'
import Icons from '../Icons'

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current)
  }, [])

  const router = useRouter()
  return (
    <nav className="w-full fixed z-40 ">
      <div className="flex flex-row items-center md:justify-between transition duration-500 bg-neutral-200/75 backdrop-blur-sm  border-b border-slate-300 dark:border-slate-700 dark:bg-slate-900/75 shadow-sm pr-[2vw] lg:px-[4vw] 2xl:px-[10vw]">
        <div className="flex-row gap-7 hidden lg:flex ">
          <MenuItem onClick={() => router.push('/')} label="next-sitemap" />
          <MenuItem
            onClick={() => router.push('/docs')}
            label="Documentation"
          />
          <MenuItem onClick={() => router.push('/examples')} label="Examples" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center  ml-3 cursor-pointer relative"
        >
          <p className="text-black text-base w-[120px] dark:text-neutral-300 font-satoshiBold">
            next-sitemap
          </p>
          <Icons.ChevronRight
            className={`w-4 ml-1 mt-1 text-black dark:text-neutral-300 transition ${
              showMobileMenu ? '-rotate-90' : 'rotate-90'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto items-center">
          <div className="max-md:hidden">
            <SocialIcons />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
