'use client'
import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import MenuButton from './MenuButton'
import Icons from '../Icons'

const But = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current)
  }, [])

  const router = useRouter()
  return (
    <nav className="w-full fixed z-10">
      <div className="flex flex-row items-center md:justify-between transition duration-500 bg-neutral-200 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm pr-[2vw] lg:px-[4vw] 2xl:px-[10vw]">
        <div
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-row items-center  pl-10 cursor-pointer relative py-2"
        >
          <p className="text-black text-base  dark:text-neutral-300 font-satoshiBold">
            Menu
          </p>
          <Icons.ChevronRight
            className={`w-4 ml-1 mt-1 text-black dark:text-neutral-300 transition ${
              showMobileMenu ? '-rotate-90' : 'rotate-90'
            }`}
          />
          <MenuButton visible={showMobileMenu} />
        </div>
      </div>
    </nav>
  )
}

export default But
