// src/components/add-device/form.js (lokasi yang disarankan)
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { memo, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

// !!! PENTING: Anda harus membuat file ini dan mendefinisikan deviceSchema di sana
// Misalnya: src/components/add-device/utils.js
// export const deviceSchema = z.object({
//   deviceName: z.string().min(2, "Nama perangkat minimal 2 karakter."),
//   streamUrl: z.string().url("URL stream tidak valid.").optional().or(z.literal('')), // opsional
//   cameraType: z.string().optional(),
// });
import { deviceSchema } from '@/components/submit-device/utils' // <-- PATH DAN NAMA SKEMA BARU!

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select' // <-- Pastikan ini diimpor!
import { cn } from '@/lib/utils'

export const SubmitDeviceForm = memo(({ className, setFormOpen, currentDevice, Devices, onDeviceAdded }) => { // <-- Prop 'Devices' & 'onDeviceAdded'
  const memoizedFormOptions = useMemo(
    () => ({
      resolver: zodResolver(deviceSchema), // <-- Gunakan skema validasi device yang baru
      mode: 'onChange',
      defaultValues: {
        deviceName: currentDevice?.deviceName ?? '', // Menggunakan deviceName dari currentDevice
        streamUrl: currentDevice?.streamUrl ?? '', // Misalnya untuk stream URL
        cameraType: currentDevice?.cameraType ?? '' // Menggunakan cameraType dari currentDevice atau ''
      }
    }),
    [currentDevice] 
  )

  const form = useForm(memoizedFormOptions)
  const formState = useMemo(() => form.formState, [form.formState])
  const { isSubmitting, errors, isValid } = formState
  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors])

  const onSubmit = useCallback(
    async (values) => {
      // --- PERUBAHAN PENTING: Tanpa Panggilan API ke Database untuk sementara ---
      try {
        console.log('Data Perangkat yang Disubmit (hanya di frontend):', values);

        // Panggil fungsi callback dari parent untuk menambahkan perangkat ke state lokal
        if (onDeviceAdded) {
          onDeviceAdded(values);
        }

        form.reset(); 
        toast.success('Perangkat berhasil ditambahkan!', { // Pesan toast yang diperbarui
          description: (
            <span>
              Perangkat <span className="underline underline-offset-4">{values.deviceName}</span> telah ditambahkan ke daftar Anda.
            </span>
          )
        });
      } catch (error) {
        toast.error(error.message || 'Gagal menambahkan perangkat.');
      } finally {
        setFormOpen(false);
      }
    },
    [form, setFormOpen, onDeviceAdded]
  )

  const renderDeviceNameField = useCallback(
    ({ field }) => (
      <FormItem>
        <FormLabel>Nama Kamera/Perangkat</FormLabel>
        <FormControl>
          <Input placeholder="Kamera Ruang Tamu" {...field} /> 
        </FormControl>
        <FormMessage />
      </FormItem>
    ),
    []
  )

  const renderStreamUrlField = useCallback( 
    ({ field }) => (
      <FormItem>
        <FormLabel>URL Stream RTSP/HTTP (Opsional)</FormLabel>
        <FormControl>
          <Input placeholder="rtsp://ip-kamera/stream" {...field} /> 
        </FormControl>
        <FormDescription>URL untuk melihat live stream kamera (jika ada).</FormDescription> 
        <FormMessage />
      </FormItem>
    ),
    []
  )

    const renderTypeField = useCallback(
      ({ field }) => (
        <FormItem>
          <FormLabel>Tipe Kamera/Perangkat</FormLabel> 
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Tipe Perangkat" /> 
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Devices && Devices.map((modelItem) => ( // <-- Iterasi pada prop 'Devices'
                <SelectItem key={modelItem.id || modelItem.name} value={modelItem.name}> {/* Asumsi modelItem punya id/name */}
                  {modelItem.name} {/* Tampilkan nama model */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>Opsional, membantu mengkategorikan perangkat.</FormDescription> {/* Deskripsi baru */}
          <FormMessage />
        </FormItem>
      ),
      [Devices] // <-- Dependensi array yang benar adalah prop 'Devices'
    )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)}>
        {/* PENTING: Nama 'name' di FormField harus unik dan cocok dengan defaultValues/schema */}
        <FormField control={form.control} name="deviceName" render={renderDeviceNameField} /> {/* name="deviceName" */}
        <FormField control={form.control} name="streamUrl" render={renderStreamUrlField} /> {/* name="streamUrl" */}
        <FormField control={form.control} name="cameraType" render={renderTypeField} /> {/* name="cameraType" */}
        <Button
          type="submit"
          className="w-full"
          // Pastikan properti errors.api?.limitError sudah tidak relevan jika tidak ada API
          disabled={isSubmitting || !isValid} // Hapus errors?.api?.limitError jika tidak ada API
        >
          {hasErrors ? (
            'Perbaiki Form' // Pesan lebih sesuai jika ada error
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isSubmitting ? 'submitting' : 'submit'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                {isSubmitting ? 'Menambahkan...' : 'Tambahkan Perangkat'} {/* Teks tombol baru */}
              </motion.span>
            </AnimatePresence>
          )}
        </Button>
      </form>
    </Form>
  )
})

// Perbaikan: Ubah displayName agar sesuai dengan nama komponen
SubmitDeviceForm.displayName = 'SubmitDeviceForm'