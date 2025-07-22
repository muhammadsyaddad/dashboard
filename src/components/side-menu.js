'use client'

import dynamic from 'next/dynamic' // Pastikan ini ada
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { LoadingSpinner } from '@/components/loading-spinner'
import { MenuContent } from '@/components/menu-content'
import { ScrollArea } from '@/components/scroll-area'
import { useKeyPress } from '@/hooks/useKeyPress'
import { cn } from '@/lib/utils'

// INI ADALAH BARIS PENTING YANG MUNGKIN HILANG
const SubmitBookmarkDialog = dynamic(
  () => import('@/components/submit-bookmark/dialog').then((mod) => mod.SubmitBookmarkDialog),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
)

const keyCodePathnameMapping = {
  Digit1: '/',
  Digit2: '/writing',
  Digit3: '/journey',
  Digit4: '/stack',
  Digit5: '/workspace',
  Digit6: '/bookmarks'
}

export const SideMenu = ({ title, bookmarks = [], isInner, children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const onToggleCollapse = () => setIsCollapsed(!isCollapsed)

  useKeyPress(onKeyPress, Object.keys(keyCodePathnameMapping))

  function onKeyPress(event) {
    const key = event.code
    const targetPathname = keyCodePathnameMapping[key]
    if (targetPathname && targetPathname !== pathname) router.push(targetPathname)
  }

  const isBookmarksPath = pathname.startsWith('/devices')
  const currentBookmark = bookmarks?.find((bookmark) => `/devices/${bookmark.slug}` === pathname)

  const sidebarWidthClass = isInner
    ? isCollapsed
      ? 'lg:w-20'
      : 'lg:w-80 xl:w-96'
    : isCollapsed
      ? 'lg:w-20'
      : 'lg:w-60 xl:w-72'

  return (
    <ScrollArea
      className={cn(
        'hidden bg-zinc-50 transition-all duration-300 ease-in-out lg:flex lg:flex-col lg:border-r',
        sidebarWidthClass
      )}
    >
      {!isInner ? (
        <div className="bg-zinc-50 p-3">
          <MenuContent isCollapsed={isCollapsed} onToggleCollapse={onToggleCollapse} />
        </div>
      ) : (
        <>
          {title && (
            <div className="sticky top-0 z-10 border-b bg-zinc-50 px-5 py-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-tight">{title}</span>
                <div className="flex items-center gap-2">
                  {isBookmarksPath && <SubmitBookmarkDialog bookmarks={bookmarks} currentBookmark={currentBookmark} />}
                </div>
              </div>
            </div>
          )}
          <div className="bg-zinc-50 p-3">{children}</div>
        </>
      )}
    </ScrollArea>
  )
}
