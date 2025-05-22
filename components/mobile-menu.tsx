"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface NavigationItem {
  label: string
  sectionId: string
}

interface MobileMenuProps {
  navigationItems: NavigationItem[]
  activeSection: string
  onNavigate: (sectionId: string) => void
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function MobileMenu({ navigationItems, activeSection, onNavigate }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  const handleLinkClick = (sectionId: string) => {
    // First close the menu
    setOpen(false)

    // Add a small delay to ensure the sheet closes before scrolling
    setTimeout(() => {
      // Find the section element
      const section = document.getElementById(sectionId)

      if (section) {
        // Calculate position with offset for header
        const headerOffset = 100
        const elementPosition = section.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        // Smooth scroll to section
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        // Update URL without causing page jump
        window.history.pushState({}, "", `#${sectionId}`)

        // Update active section in parent component
        onNavigate(sectionId)
      }
    }, 300) // Delay to ensure menu closes first
  }

  // Close menu on resize if screen becomes larger than mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md border border-[#E2E2E2]/20 bg-transparent text-[#E2E2E2] hover:bg-[#E2E2E2]/10 transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-[#002720] text-[#E2E2E2] border-[#E2E2E2]/20 p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-[#E2E2E2]/10">
              <span className="font-bold text-lg">Menu</span>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-md border border-[#E2E2E2]/20 bg-transparent text-[#E2E2E2] hover:bg-[#E2E2E2]/10 transition-colors"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.sectionId}
                  onClick={() => handleLinkClick(item.sectionId)}
                  className={cn(
                    "py-2 px-4 rounded-md transition-all text-left w-full relative overflow-hidden",
                    activeSection === item.sectionId
                      ? "bg-[#E2E2E2]/10 text-[#F2F5B4] font-medium"
                      : "hover:bg-[#E2E2E2]/5 text-[#E2E2E2]",
                  )}
                  aria-current={activeSection === item.sectionId ? "page" : undefined}
                >
                  {item.label}
                  {activeSection === item.sectionId && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-[#F2F5B4]" />
                  )}
                </button>
              ))}
            </nav>
            <div className="mt-auto p-4 border-t border-[#E2E2E2]/10">
              <Link
                href="https://wa.me/5555996061063"
                target="_blank"
                className="flex items-center justify-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-3 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-all hover:scale-105 duration-300 w-full"
                onClick={() => setOpen(false)}
              >
                AGENDE AGORA
                <WhatsAppIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
