'use client'

import Link from 'next/link'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { cn } from '@/lib/utils'

import { NavigationLink } from '@/components/navigation-link'
import { LINKS } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export const MenuContent = ({ isCollapsed, onToggleCollapse }) => {
  return (
    <div className="flex w-full flex-col text-sm">
      <div className="flex flex-col gap-4">
        {/* Style di sini tidak diubah agar Anda bisa mengaturnya sendiri */}
        <div className={cn('flex items-center', isCollapsed ? 'justify-center' : 'justify-between')}>
          {!isCollapsed && (
            <Link href="/" className="link-card inline-flex items-center gap-2">
              <img
                src="/assets/hellnah.png"
                alt="Kyuantum Logo"
                width={40}
                height={40}
                className="rounded-full border-none shadow-none"
              />
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight">Kyuantum.</span>
              </div>
            </Link>
          )}

          <Button variant="ghost" size="icon" onClick={onToggleCollapse}>
            {isCollapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </Button>
        </div>

        <div className="flex flex-col gap-1">
          {LINKS.map((link, linkIndex) => (
            <NavigationLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              shortcutNumber={linkIndex + 1}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>
      <hr />
    </div>
  )
}
