import { PlusIcon } from 'lucide-react'
import { Suspense } from 'react'

import { ListItem } from '@/components/list-item'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'
import { SideMenu } from '@/components/side-menu'
import { Button } from '@/components/ui/button' // Tambahkan impor ini
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
          <div className="flex h-full flex-col justify-between">
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
            <div>
              <hr className="-mx-3 my-3" />
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-semibold">Model</h3>
                <Button variant="ghost" size="icon" className="size-7">
                  <PlusIcon size={16} />
                </Button>
              </div>
              <hr className="-mx-3 my-3" />
              <div className="p-2 text-sm text-gray-500">No models added yet</div>
            </div>
          </div>
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
