import { PlusIcon } from 'lucide-react'
import { Suspense } from 'react'

import { ListItem } from '@/components/list-item'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'
import { SideMenu } from '@/components/side-menu'
import { Button } from '@/components/ui/button' // Tambahkan impor ini
import { Toaster } from '@/components/ui/sonner'
import { getBookmarks } from '@/lib/raindrop'
import { sortByProperty } from '@/lib/utils'
import { AddDeviceDialog } from '@/components/AddDeviceDialog'
import { getServers } from '@/lib/raindrop'

async function fetchData() {
  const servers = await getServers()
  const sortedServers = sortByProperty(servers, 'name')
  // Kembalikan dengan nama yang jelas
  return { servers: sortedServers }
}

export default async function DevicesLayout({ children }) {
  const { servers } = await fetchData()

  return (
    <>
      <div className="flex w-full">
        <SideMenu title="Devices" bookmarks={servers} isInner>
          <div className="flex h-full flex-col justify-between gap-y-36">
            <Suspense fallback={<ScreenLoadingSpinner />}>
              <div className="flex flex-col gap-1 text-sm">
                {servers?.map((server) => (
                  <ListItem
                    key={server._id}
                    path={`/devices/${server.slug}`}
                    title={server.name}
                    description={`${server.count}`}
                  />
                ))}
              </div>
            </Suspense>
            <div>
              <hr className="-mx-3 my-3" />
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-semibold">Model</h3>
                <AddDeviceDialog />
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
