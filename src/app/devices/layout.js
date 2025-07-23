import { PlusIcon } from 'lucide-react'
import { Suspense } from 'react'

import { ListItem } from '@/components/list-item'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'
import { SideMenu } from '@/components/side-menu'
import { Toaster } from '@/components/ui/sonner'
import { getBookmarks } from '@/lib/raindrop'
import { sortByProperty } from '@/lib/utils'

async function fetchData() {
  const bookmarks = await getBookmarks()
  const sortedBookmarks = sortByProperty(bookmarks, 'title')
  return { bookmarks: sortedBookmarks }
}

export default async function DevicesLayout({ children }) {
  const { bookmarks } = await fetchData()

  return (
    <>
      <div className="flex w-full">
        <SideMenu title="Devices" bookmarks={bookmarks} isInner>
           <Suspense fallback={<ScreenLoadingSpinner />}>
              <div className="flex flex-col gap-1 text-sm">
                {bookmarks?.map((device) => (
                  <ListItem
                    key={device._id}
                    path={`/devices/${device.slug}`}
                    title={device.title}
                    description={`${device.count} devices`}
                  />
                ))}
              </div>
            </Suspense>
        </SideMenu>
        <div className="lg:bg-grid flex-1">{children}</div>
      </div>
      <Toaster
        closeButton
        toastOptions={{
          duration: 5000
        }}
      />
    </>
  )
}

export const viewport = {
  maximumScale: 1
}
