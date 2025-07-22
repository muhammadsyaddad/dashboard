'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { SubmitBookmarkForm } from '@/components/submit-bookmark/formserver'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { SUBMIT_DEVICE_FORM_DESCRIPTION, SUBMIT_DEVICE_FORM_TITLE } from '@/lib/constants'

export const SubmitBookmarkDialog = ({ bookmarks, currentBookmark }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="xs" className="relative items-center">
          <Plus size={16} className="gap-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{SUBMIT_DEVICE_FORM_TITLE}</DialogTitle>
          <DialogDescription>{SUBMIT_DEVICE_FORM_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <SubmitBookmarkForm setFormOpen={setOpen} bookmarks={bookmarks} currentBookmark={currentBookmark} />
      </DialogContent>
    </Dialog>
  )
}
