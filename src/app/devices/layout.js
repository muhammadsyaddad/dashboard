// src/app/devices/layout.js
'use client' // <-- PENTING: Menjadikan Layout ini Client Component

import { useState } from 'react' // Untuk mengelola state daftar perangkat
import { SideMenu } from '@/components/side-menu-New' // Mengimpor SideMenu Anda // Mengimpor konstanta tipe perangkat

// Ini adalah konteks React yang bisa Anda gunakan jika daftar 'devices'
// perlu diakses oleh komponen anak yang lebih dalam dari layout.
// import { createContext, useContext } from 'react';
// export const DevicesContext = createContext(null);

export default function DevicesLayout({ children }) {
  // State untuk menyimpan daftar perangkat di dalam layout
  // Daftar ini akan diupdate ketika ada perangkat baru ditambahkan melalui form
  const [devices, setDevices] = useState([])

  // Fungsi callback yang akan diteruskan ke SideMenu, lalu ke AddDeviceDialog, lalu ke SubmitDeviceForm.
  // Fungsi ini akan menambahkan perangkat baru ke state 'devices' di layout.
  const handleDeviceAdded = (newDeviceData) => {
    // Tambahkan perangkat baru ke array 'devices'.
    // Memberikan ID unik (misalnya timestamp) sangat direkomendasikan untuk properti 'key' di React.
    setDevices((prevDevices) => [...prevDevices, { id: Date.now(), ...newDeviceData }])
    console.log('Perangkat baru ditambahkan di Layout state:', newDeviceData)
  }

  // Fungsi callback untuk menambahkan model baru
  const handleModelAdded = (newModelData) => {
    // Untuk saat ini, kita bisa log atau simpan ke state terpisah
    console.log('Model baru ditambahkan:', newModelData)
    // Jika Anda memiliki state terpisah untuk models, update di sini
  }

  // Anda bisa meneruskan 'devices' ke children (yaitu page.js) melalui React Context
  // jika page.js perlu mengakses daftar perangkat yang sama yang dikelola oleh layout.
  // Jika page.js akan mengambil datanya sendiri atau hanya menampilkan 'children' dari SideMenu,
  // maka tidak perlu Context ini.
  // const devicesContextValue = useMemo(() => ({ devices, setDevices }), [devices]);

  return (
    <div className="flex h-screen">
      {' '}
      {/* Struktur layout dasar, misalnya dengan Tailwind CSS */}
      {/* SideMenu akan berada di sini */}
      <SideMenu
        title1="Tambah Perangkat" // Judul untuk bagian perangkat
        title2="Tambah Model" // Judul untuk bagian model
        isInner={true} // Menandakan ini sebagai inner sidebar (sesuai logika SideMenu)
        onDeviceAdded={handleDeviceAdded} // Meneruskan fungsi callback penambah perangkat
        onModelAdded={handleModelAdded} // Meneruskan fungsi callback penambah model
        // Meneruskan data tipe perangkat (DEVICESTYPE)
      ></SideMenu>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
