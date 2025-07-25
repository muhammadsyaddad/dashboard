// src/components/side-menu.js

'use client'

import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import { LoadingSpinner } from '@/components/loading-spinner'
import { MenuContent } from '@/components/menu-content'
import { ScrollArea } from '@/components/scroll-area'
import { useKeyPress } from '@/hooks/useKeyPress'
import { cn } from '@/lib/utils'
import { DEVICESTYPE, MODELNAME, MODELSIZE } from '@/lib/constants'

// --- Impor AddDeviceDialog yang baru ---
// Pastikan path ini sesuai dengan lokasi file dialog Anda
const AddDeviceDialog = dynamic(
  () => import('@/components/submit-device/AddDeviceDialog').then((mod) => mod.AddDeviceDialog),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
)
const AddModelDialog = dynamic(
  () => import('@/components/submit-model/AddServerDialog').then((mod) => mod.AddDeviceDialog),
  {
    loading: () => <LoadingSpinner />,
    ssr: false
  }
)

// --- Opsi: Impor AddModelDialog jika sudah dibuat ---
// const AddModelDialog = dynamic(
//   () => import('@/components/add-model/dialog').then((mod) => mod.AddModelDialog),
//   {
//     loading: () => <LoadingSpinner />,
//     ssr: false
//   }
// )

// // Ini masih ada sebagai placeholder untuk title2, tapi ingat perlu diganti nanti
// const SubmitBookmarkDialog = dynamic(
//   () => import('@/components/submit-bookmark/dialog').then((mod) => mod.SubmitBookmarkDialog),
//   {
//     loading: () => <LoadingSpinner />,
//     ssr: false
//   }

const keyCodePathnameMapping = {
  Digit1: '/',
  Digit2: '/writing',
  Digit3: '/journey',
  Digit4: '/stack',
  Digit5: '/workspace',
  Digit6: '/bookmarks' // Mungkin perlu disesuaikan jika navigasi berubah ke /devices
}

// --- Menambahkan prop 'onDeviceAdded' dan 'deviceModels' ke SideMenu ---
export const SideMenu = ({ title1, tittle2, isInner, onDeviceAdded, onModelAdded }) => {
  // <-- Prop baru
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

  const isDevicesPath = pathname.startsWith('/devices')

  const sidebarWidthClass = isInner
    ? isCollapsed
      ? 'lg:w-20'
      : 'lg:w-80 xl:w-96'
    : isCollapsed
      ? 'lg:w-20'
      : 'lg:w-60 xl:w-72'

  return (
    <div
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
          {/* Bagian untuk "Add Device/Camera" (title1) */}
          {title1 && (
            <div className="sticky top-0 z-10 border-b bg-zinc-50 px-5 py-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-tight">{title1}</span>
                <div className="flex items-center gap-2">
                  {isDevicesPath && <AddDeviceDialog onDeviceAdded={onDeviceAdded} models={DEVICESTYPE} />}
                </div>
              </div>
            </div>
          )}

          {/* Bagian untuk "Add Model" (tittle2) - MASIH MENGGUNAKAN PLACEHOLDER */}
          {tittle2 && (
            <>
              <div className="sticky top-0 z-10 mt-96 border-t border-b bg-zinc-50 px-5 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold tracking-tight">{tittle2}</span>
                  <div className="flex items-center gap-2">
                    {isDevicesPath && (
                      <AddModelDialog onModelAdded={onModelAdded} Models={MODELNAME} ModelSize={MODELSIZE} />
                    )}
                  </div>
                </div>
              </div>
              <ScrollArea className="mt-2 h-40 px-3 py-2">
                <div className="text-sm text-gray-500">
                  {/* Konten daftar model akan berada di sini, mungkin prop 'modelsContent' */}
                  <p>Daftar model kamera akan discroll di area ini.</p>
                </div>
              </ScrollArea>
            </>
          )}
        </>
      )}
    </div>
  )
}
