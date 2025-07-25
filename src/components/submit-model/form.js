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

export const SubmitDeviceForm = memo(({ className, setFormOpen, currentModel, Models, ModelSize, onModelAdd }) => {
  // <-- Prop 'Models' & 'onModelAdd'
  const memoizedFormOptions = useMemo(
    () => ({
      resolver: zodResolver(deviceSchema), // <-- Gunakan skema validasi device yang baru
      mode: 'onChange',
      defaultValues: {
        deviceName: currentModel?.deviceName ?? '', // Menggunakan deviceName dari currentModel
        streamUrl: currentModel?.streamUrl ?? '', // Misalnya untuk stream URL
        cameraType: currentModel?.cameraType ?? '' // Menggunakan cameraType dari currentModel atau ''
      }
    }),
    [currentModel]
  )

  const form = useForm(memoizedFormOptions)
  const formState = useMemo(() => form.formState, [form.formState])
  const { isSubmitting, errors, isValid } = formState
  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors])

  const onSubmit = useCallback(
    async (values) => {
      // --- PERUBAHAN PENTING: Tanpa Panggilan API ke Database untuk sementara ---
      try {
        console.log('Data Perangkat yang Disubmit (hanya di frontend):', values)

        // Panggil fungsi callback dari parent untuk menambahkan perangkat ke state lokal
        if (onModelAdd) {
          onModelAdd(values)
        }

        form.reset()
        // Pesan toast yang diperbarui
        toast.success('Perangkat berhasil ditambahkan!', {
          description: (
            <span>
              Perangkat <span className="underline underline-offset-4">{values.deviceName}</span> telah ditambahkan ke
              daftar Anda.
            </span>
          )
        })
      } catch (error) {
        toast.error(error.message || 'Gagal menambahkan perangkat.')
      } finally {
        setFormOpen(false)
      }
    },
    [form, setFormOpen, onModelAdd]
  )

  const renderModelNameField = useCallback(
    ({ field }) => (
      <FormItem>
        <FormLabel>Tipe Kamera/Perangkat</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Add Model" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {Models &&
              Models.map(
                (
                  modelSizeItem // <-- Iterasi pada prop 'Models'
                ) => (
                  <SelectItem key={modelSizeItem.id || modelSizeItem.name} value={modelSizeItem.name}>
                    {' '}
                    {/* Asumsi modelItem punya id/name */}
                    {modelSizeItem.name} {/* Tampilkan nama model */}
                  </SelectItem>
                )
              )}
          </SelectContent>
        </Select>
        <FormDescription>Opsional, membantu mengkategorikan perangkat.</FormDescription> {/* Deskripsi baru */}
        <FormMessage />
      </FormItem>
    ),
    [Models] // <-- Dependensi array yang benar adalah prop 'Devices'
  )
  const renderSizeModelField = useCallback(
    ({ field }) => (
      <FormItem>
        <FormLabel>Model Size</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Add Model" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {ModelSize &&
              ModelSize.map(
                (
                  modelSizeItem // <-- Iterasi pada prop 'Models'
                ) => (
                  <SelectItem key={modelSizeItem.id || modelSizeItem.name} value={modelSizeItem.name}>
                    {' '}
                    {/* Asumsi modelSizeItem punya id/name */}
                    {modelSizeItem.name} {/* Tampilkan nama model */}
                  </SelectItem>
                )
              )}
          </SelectContent>
        </Select>
        <FormDescription>Opsional, membantu mengkategorikan perangkat.</FormDescription> {/* Deskripsi baru */}
        <FormMessage />
      </FormItem>
    ),
    [ModelSize] // <-- Dependensi array yang benar adalah prop 'ModelSize'
  )
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('flex flex-col gap-6', className)}>
        {/* PENTING: Nama 'name' di FormField harus unik dan cocok dengan defaultValues/schema */}
        <FormField control={form.control} name="deviceName" render={renderModelNameField} /> {/* name="deviceName" */}
        <FormField control={form.control} name="streamUrl" render={renderSizeModelField} /> {/* name="streamUrl" */}
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
SubmitDeviceForm.displayName = 'SubmitModelForm'
