'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { deviceFormSchema } from './submit-bookmark/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDevice } from '@/app/actions'

export const AddDeviceForm = ({ setFormOpen }) => {
  const form = useForm({
    resolver: zodResolver(deviceFormSchema),
    defaultValues: {
      deviceName: '',
      deviceType: ''
    }
  })

  const onSubmit = (data) => {
    console.log('Data device baru:', data)
    setFormOpen(false)
  }
  const deviceType = form.watch('deviceType')

  return (
    <Form {...form}>
      <form
        action={async (formData) => {
          await addDevice(formData) // Panggil server action
          setFormOpen(false) // Tutup dialog setelah selesai
        }}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="deviceName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter device name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a device type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="CCTV">CCTV (RTSP)</SelectItem>
                  <SelectItem value="Webcam">Webcam</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {deviceType === 'CCTV' && (
          <FormField
            control={form.control}
            name="rtspUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RTSP URL</FormLabel>
                <FormControl>
                  <Input placeholder="rtsp://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Kita bisa tambahkan input RTSP URL di sini nanti */}

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={() => setFormOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">Add Device</Button>
        </div>
      </form>
    </Form>
  )
}
