"use client"

import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

import { monoLabelVariants } from "@/components/signal/mono-label"
import { Pill } from "@/components/signal/pill"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Site } from "@/content/types"

import { MenuContact } from "./menu-contact"
import { MenuLink } from "./menu-link"

/**
 * Full-screen index. Base UI's modal dialog traps focus, closes on Escape,
 * locks page scroll and returns focus to the Menu pill. Choosing a section
 * closes the menu first, then scrolls to the section and focuses it.
 */
export function Menu({ site }: { site: Site }) {
  const { chrome, nav } = site
  const router = useRouter()
  const [open, setOpen] = useState(false)
  // The section picked from the menu. Kept until the menu next opens, because
  // Base UI asks finalFocus after onOpenChangeComplete has already run.
  const pending = useRef<string | null>(null)

  const handleOpenChange = (next: boolean) => {
    if (next) pending.current = null
    setOpen(next)
  }

  const select = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    // Let modified clicks (new tab / window) behave like normal links.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    pending.current = id
    setOpen(false)
  }

  const handleOpenChangeComplete = (isOpen: boolean) => {
    const id = pending.current
    if (isOpen || id === null) return

    const target = document.getElementById(id)
    if (!target) {
      router.push(`/#${id}`)
      return
    }
    window.history.pushState(null, "", `#${id}`)
    target.scrollIntoView({ block: "start" })
    target.focus({ preventScroll: true })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      onOpenChangeComplete={handleOpenChangeComplete}
    >
      <DialogTrigger render={<Pill data-cursor={chrome.cursor.menu} />}>
        <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
        {chrome.menu}
      </DialogTrigger>

      <DialogContent
        variant="fullscreen"
        showCloseButton={false}
        // Escape or Close: back to the Menu pill. A chosen section: leave focus for it.
        finalFocus={() => pending.current === null}
        className="px-page py-5"
      >
        <div className="flex items-center justify-between">
          <DialogTitle
            className={monoLabelVariants({ tone: "muted", className: "font-normal" })}
          >
            {chrome.menuTitle}
          </DialogTitle>
          <DialogClose render={<Pill data-cursor={chrome.cursor.close} />}>
            {chrome.close}
            <span aria-hidden="true">×</span>
          </DialogClose>
        </div>

        <div className="flex flex-1 flex-col gap-10 pt-10 md:flex-row md:flex-wrap md:items-end md:justify-between">
          <nav aria-label={chrome.navLabel}>
            <ul className="flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.id}>
                  <MenuLink item={item} cursor={chrome.cursor.go} onSelect={select} />
                </li>
              ))}
            </ul>
          </nav>
          <MenuContact site={site} className="mt-auto md:mt-0" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
