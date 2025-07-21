'use client'

import { RadioIcon } from 'lucide-react'
import dynamic from 'next/dynamic' // Pastikan ini ada
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { LoadingSpinner } from '@/components/loading-spinner'
import { ScrollArea } from '@/components/scroll-area'
import { Button } from '@/components/ui/button'
import { MenuContent } from '@/components/menu-content'
import { useKeyPress } from '@/hooks/useKeyPress'
import { cn } from '@/lib/utils'

// --- BARIS YANG HILANG DAN SEKARANG DIKEMBALIKAN ---
const SubmitBookmarkDialog = dynamic(
  () => import('@/components/submit-bookmark/dialog').then((mod) => mod.SubmitBookmarkDialog),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
)
// ----------------------------------------------------

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

  const isWritingPath = pathname.startsWith('/writing')
  const isBookmarksPath = pathname.startsWith('/bookmarks')
  const currentBookmark = bookmarks?.find((bookmark) => `/bookmarks/${bookmark.slug}` === pathname)

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
                  {(isWritingPath || isBookmarksPath) && (
                    <Button variant="outline" size="xs" asChild>
                      <a
                        href={isWritingPath ? '/writing.xml' : '/bookmarks.xml'}
                        title="RSS feed"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <RadioIcon size={16} className="mr-2" />
                        RSS feed
                      </a>
                    </Button>
                  )}
                  {/* Panggilan ke komponen ini sekarang akan berhasil */}
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
