'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PlusIcon } from 'lucide-react'
import { SubmitDeviceForm } from '@/components/submit-device/form' // Impor form yang baru kita buat

export const AddDeviceDialog = ({ onDeviceAdded, currentDevice, models }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="xs" className="relative items-center">
          <PlusIcon size={16} className="gap-2" />
        </Button> 
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>device</DialogTitle>
        </DialogHeader>
        <SubmitDeviceForm 
          setFormOpen={setOpen} 
          onDeviceAdded={onDeviceAdded} 
          currentDevice={currentDevice}  
          Devices={models} 
        />
      </DialogContent>
    </Dialog>
  )
}
