'use client'

import { useState } from 'react'
import { FloatingHeader } from '@/components/floating-header'
import { ScrollArea } from '@/components/scroll-area'

export default function DevicesPage() {
  const [devices, setDevices] = useState([])

  // This will be called by the layout when a new device is added
  const handleDeviceAdded = (newDevice) => {
    setDevices((prevDevices) => [...prevDevices, { id: Date.now(), ...newDevice }])
  }

  return (
    <ScrollArea className="bg-grid" useScrollAreaId>
      <FloatingHeader scrollTitle="Devices" />
      <div className="content-wrapper">
        <div className="content">
          <div className="flex flex-col gap-6 p-6">
            {/* Device List Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Daftar Perangkat</h2>
              {devices.length === 0 ? (
                <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">Belum ada perangkat yang ditambahkan</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {devices.map((device) => (
                    <div key={device.id} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                      <h3 className="font-medium text-gray-900">{device.deviceName}</h3>
                      {device.cameraType && <p className="text-sm text-gray-600 mt-1">Type: {device.cameraType}</p>}
                      {device.streamUrl && <p className="text-sm text-gray-600 mt-1">Stream URL: {device.streamUrl}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Cara Menambah Perangkat</h3>
              <p className="text-sm text-blue-700">
                Gunakan tombol "+" di bagian "Tambah Perangkat" pada sidebar untuk menambahkan perangkat baru ke dalam
                sistem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
