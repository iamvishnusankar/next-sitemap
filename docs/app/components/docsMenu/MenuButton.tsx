'use client'
import { docsConfig } from '@/config/docs'
import React from 'react'
import { DocsSidebarNav } from '../sidebar-nav'

interface MenuButtonProps {
  visible?: boolean
}

const MenuButton: React.FC<MenuButtonProps> = ({ visible }) => {

  if (!visible) {
    return null
  }

  return (
    <div className="absolute rounded-xl shadow-md w-[80vw] md:w-[70vw] bg-neutral-100 dark:bg-slate-700 h-80 overflow-y-auto overflow-hidden left-4 top-12 text-sm">
      <div className="flex flex-col cursor-pointer px-5 pt-3">
        <DocsSidebarNav items={docsConfig.sidebarNav} />
        <hr />
      </div>
    </div>
  )
}

export default MenuButton
