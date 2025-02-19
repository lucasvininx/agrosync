"use client"

import type React from "react"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"

interface SaibaMaisDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: React.ReactNode
}

export function SaibaMaisDialog({ isOpen, onClose, title, content }: SaibaMaisDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] bg-black text-white border border-green-500">
        <div className="flex justify-between items-center border-b border-green-500/50 pb-4">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
        </div>
        <ScrollArea className="h-full pr-4 mt-6">
          <div className="space-y-6 text-lg">{content}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

