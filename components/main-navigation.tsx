"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import MobileMenu from "./mobile-menu"

interface NavigationItem {
  label: string
  sectionId: string
}

interface MainNavigationProps {
  scrollProgress?: number
}

const navigationItems: NavigationItem[] = [
  { label: "Quadras", sectionId: "quadras" },
  { label: "Salão e Espaços", sectionId: "salao" },
  { label: "Aulas", sectionId: "aulas" },
  { label: "PPF", sectionId: "ppf" },
  { label: "Diferenciais", sectionId: "diferenciais" },
  { label: "Contato", sectionId: "contato" },
]

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function MainNavigation({ scrollProgress = 0 }: MainNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("")
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      // Update header background based on scroll position
      setScrolled(window.scrollY > 20)

      // Find the current active section
      const sections = document.querySelectorAll("section[id], [role='tabpanel'][id]")
      const scrollPosition = window.scrollY + 100 // Offset for header

      let currentActive = ""
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = section.clientHeight
        const sectionId = section.getAttribute("id")

        if (sectionId && scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
          currentActive = sectionId
        }
      })

      if (currentActive !== activeSection) {
        setActiveSection(currentActive)
      }
    }

    // Initial check
    handleScroll()

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [activeSection])

  const scrollToSection = (sectionId: string) => {
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

      // Update active section
      setActiveSection(sectionId)
    }
  }

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 w-full bg-[#002720] py-4", scrolled ? "shadow-md" : "")}>
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 duration-300">
          <Image
            src="/logo.png"
            alt="Pelea Deportes y Bar"
            width={120}
            height={40}
            className="h-10 w-auto logo-white"
          />
        </Link>
        <nav className="hidden md:flex items-center justify-center flex-1 gap-8">
          {navigationItems.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => scrollToSection(item.sectionId)}
              className={cn(
                "text-sm font-medium transition-colors relative py-1",
                activeSection === item.sectionId ? "text-[#F2F5B4]" : "text-[#E2E2E2] hover:text-[#F2F5B4]",
              )}
              aria-current={activeSection === item.sectionId ? "page" : undefined}
            >
              {item.label}
              {activeSection === item.sectionId && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F2F5B4] rounded-full transform origin-left transition-transform duration-300" />
              )}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="https://wa.me/5555996061063"
            target="_blank"
            className="bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium text-sm hover:bg-[#F2F5B4]/90 transition-all hover:scale-105 duration-300 flex items-center gap-1"
          >
            AGENDE AGORA
            <WhatsAppIcon className="h-4 w-4" />
          </Link>
          <MobileMenu navigationItems={navigationItems} activeSection={activeSection} onNavigate={setActiveSection} />
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#002720]/30">
        <div
          className="h-full bg-[#F2F5B4] transition-all duration-300"
          style={{
            width: `${Math.min(scrollProgress, 100)}%`,
          }}
        />
      </div>
    </header>
  )
}
