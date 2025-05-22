"use client"

import { useEffect } from "react"

interface ScrollToSectionProps {
  sectionId: string
}

export function useScrollToSection() {
  useEffect(() => {
    // Handle initial hash in URL
    const hash = window.location.hash
    if (hash) {
      const id = hash.replace("#", "")
      const element = document.getElementById(id)
      if (element) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          const headerOffset = 100
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }, 300)
      }
    }

    // Update active section based on scroll position
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id], [role='tabpanel'][id]")
      const scrollPosition = window.scrollY + 100 // Offset for header

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = section.clientHeight
        const sectionId = section.getAttribute("id")

        if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100 && sectionId) {
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("data-section") === sectionId) {
              link.classList.add("active")
            }
          })
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Update URL without causing page jump
      window.history.pushState({}, "", `#${sectionId}`)
    }
  }

  return { scrollToSection }
}

export default function ScrollToSection({ sectionId }: ScrollToSectionProps) {
  useEffect(() => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }, [sectionId])

  return null
}
