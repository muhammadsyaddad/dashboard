'use server'

import { getBookmarkItems } from '@/lib/raindrop'
import { revalidatePath } from 'next/cache'

export async function getBookmarkItemsByPageIndex(id, pageIndex) {
  return await getBookmarkItems(id, pageIndex)
}

export async function addDevice(formData) {
  const deviceName = formData.get('deviceName')
  const deviceType = formData.get('deviceType')
  console.log('Menyimpan device baru ke database (simulasi):', { deviceName, deviceType })

  revalidatePath('/devices')
}

export async function addServer(formData) {
  const serverName = formData.get('serverName')

  // Di dunia nyata, di sini Anda akan menyimpan data ke database (misalnya, Supabase)
  console.log('Menyimpan server baru (simulasi):', { serverName })

  revalidatePath('/devices')
  return { success: true }
}
