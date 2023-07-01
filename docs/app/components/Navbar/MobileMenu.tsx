'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import MenuItem from './NavbarItem'
import SocialIcons from '../blocks/SocialIcons'

interface MobileMenuProps {
  visible?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  const router = useRouter()
  if (!visible) {
    return null
  }

  return (
    <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[30vw] bg-neutral-100 dark:bg-slate-700 h-auto overflow-hidden left-0 top-12 text-sm">
      <div className="flex flex-col cursor-pointer">
        <MenuItem onClick={() => router.push('/')} label="Home" />
        <MenuItem onClick={() => router.push('/docs')} label="Documentation" />
        <MenuItem onClick={() => router.push('/examples')} label="Examples" />
        <hr />
      </div>
      <div className="w-full flex justify-center py-2 md:hidden">
        <SocialIcons />
      </div>
    </div>
  )
}

export default MobileMenu
