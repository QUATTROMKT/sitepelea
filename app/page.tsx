"use client"

import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, Instagram, ArrowUp } from "lucide-react"
import MainNavigation from "@/components/main-navigation"
import { AnimatedElement, AnimatedGroup, AnimatedTitle, AnimatedCard } from "@/components/animations"
import { useEffect, useState } from "react"
import "./animations.css"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function LandingPage() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("quadras")

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

          // Set active tab based on hash
          if (["quadras", "salao", "aulas", "ppf", "diferenciais", "contato"].includes(id)) {
            setActiveTab(id)
          }
        }, 300)
      }
    }

    // Show/hide back to top button based on scroll position
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)

      // Calculate scroll progress
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)

      // Update active tab based on scroll position
      const sections = document.querySelectorAll("[role='tabpanel'][id]")
      const scrollPosition = window.scrollY + 150 // Offset for header

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = section.clientHeight
        const sectionId = section.getAttribute("id")

        if (
          sectionId &&
          scrollPosition >= sectionTop - 150 &&
          scrollPosition < sectionTop + sectionHeight - 150 &&
          ["quadras", "salao", "aulas", "ppf", "diferenciais", "contato"].includes(sectionId)
        ) {
          setActiveTab(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const headerOffset = 100
      const elementPosition = section.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Update URL without causing page jump
      window.history.pushState({}, "", `#${sectionId}`)

      // Update active tab
      if (["quadras", "salao", "aulas", "ppf", "diferenciais", "contato"].includes(sectionId)) {
        setActiveTab(sectionId)
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#E2E2E2]">
      <MainNavigation scrollProgress={scrollProgress} />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section id="hero" className="relative py-16 md:py-24 lg:py-32 bg-[#002720]">
          <div className="container relative z-10 flex flex-col items-center text-center">
            <AnimatedElement animation="fade-in" duration={800}>
              <div className="mb-8">
                <Image
                  src="/logo2.png"
                  alt="Pelea Deportes y Bar"
                  width={300}
                  height={300}
                  className="mx-auto logo-white"
                />
              </div>
            </AnimatedElement>

            <AnimatedTitle
              as="h1"
              delay={400}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E2E2E2] mb-4 max-w-3xl"
            >
              Seu Espaço Completo para Esportes e Lazer em Santa Maria
            </AnimatedTitle>

            <AnimatedElement animation="fade-up" delay={600} duration={800}>
              <p className="text-lg md:text-xl text-[#E2E2E2]/80 mb-8 max-w-2xl">
                Quadras de qualidade, aulas especializadas e o melhor ambiente para seus momentos de diversão
              </p>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={800} duration={800}>
              <Link
                href="https://wa.me/5555996061063"
                target="_blank"
                className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-6 py-3 rounded-md font-bold text-lg hover:bg-[#F2F5B4]/90 transition-colors hover:scale-105 duration-300"
              >
                ENTRE EM CONTATO
                <WhatsAppIcon className="h-5 w-5" />
              </Link>
            </AnimatedElement>

            <AnimatedElement animation="fade-in" delay={1000} duration={800}>
              <div className="flex items-center gap-2 mt-8 text-[#E2E2E2]/80">
                <MapPin className="h-5 w-5" />
                <p>Rua Duque de Caxias, 2653 - Santa Maria/RS</p>
              </div>
            </AnimatedElement>
          </div>
        </section>

        {/* Tabs Sections */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="container py-16">
          {/* Tab List */}
          <AnimatedElement animation="fade-in" duration={800}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full bg-[#002720]/10 p-1 mb-8">
              <TabsTrigger
                value="quadras"
                className="data-[state=active]:bg-[#002720] data-[state=active]:text-[#E2E2E2]"
                onClick={() => scrollToSection("quadras")}
              >
                Quadras
              </TabsTrigger>
              <TabsTrigger
                value="salao"
                className="data-[state=active]:bg-[#002720] data-[state=active]:text-[#E2E2E2]"
                onClick={() => scrollToSection("salao")}
              >
                Salão e Espaços
              </TabsTrigger>
              <TabsTrigger
                value="aulas"
                className="data-[state=active]:bg-[#002720] data-[state=active]:text-[#E2E2E2]"
                onClick={() => scrollToSection("aulas")}
              >
                Aulas
              </TabsTrigger>
              <TabsTrigger
                value="ppf"
                className="data-[state=active]:bg-[#002720] data-[state=active]:text-[#E2E2E2]"
                onClick={() => scrollToSection("ppf")}
              >
                PPF
              </TabsTrigger>
              <TabsTrigger
                value="diferenciais"
                className="data-[state=active]:bg-[#002720] data-[state=active]:text-[#E2E2E2]"
                onClick={() => scrollToSection("diferenciais")}
              >
                Diferenciais
              </TabsTrigger>
              <TabsTrigger
                value="contato"
                className="data-[state=active]:bg-[#002720] data-[state=active]:text-[#E2E2E2]"
                onClick={() => scrollToSection("contato")}
              >
                Contato
              </TabsTrigger>
            </TabsList>
          </AnimatedElement>

          {/* Quadras Tab */}
          <TabsContent
            value="quadras"
            id="quadras"
            className="focus-visible:outline-none focus-visible:ring-0 scroll-mt-24"
          >
            <AnimatedGroup className="text-center mb-10" staggerDelay={150} baseDelay={100}>
              <AnimatedTitle className="text-3xl font-bold text-[#002720] mb-2">Nossas Quadras</AnimatedTitle>
              <AnimatedElement animation="fade-up">
                <p className="text-lg text-[#401F16] max-w-2xl mx-auto">
                  Estrutura profissional para sua prática esportiva
                </p>
              </AnimatedElement>
            </AnimatedGroup>

            <AnimatedGroup className="grid md:grid-cols-2 gap-8" staggerDelay={200}>
              <AnimatedCard>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image src="/quadra-areia-interna.jpeg" alt="Quadras de areia" fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Las Canchas de Areia</h3>
                    <p className="text-[#401F16] mb-4">
                      Quadras profissionais para futevôlei e beach tennis com areia de alta qualidade
                    </p>
                    <div className="bg-[#E2E2E2] p-4 rounded-md mb-4">
                      <h4 className="font-bold text-[#002720] mb-2">Valores</h4>
                      <ul className="space-y-1 text-[#401F16]">
                        <li>
                          Beach Tennis / Futevôlei: <span className="font-semibold">R$ 70,00</span> - 01:00 hora
                        </li>
                        <li>Vôlei com mais de 4 pessoas em quadra:</li>
                        <li className="ml-4">R$ 100,00 - 01:00 hora</li>
                        <li className="ml-4">R$ 120,00 - 01:30 hora</li>
                        <li className="ml-4">R$ 150,00 - 02:00 horas</li>
                      </ul>
                    </div>
                    <Link
                      href="https://gripo.app/reservar/pelea-deportes-y-bar-santa-maria-rs"
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      AGENDE SUA QUADRA
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={200}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image src="/quadra-poliesportiva.jpeg" alt="La Cajita" fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">La Cajita</h3>
                    <p className="text-[#401F16] mb-4">
                      Quadra poliesportiva para futsal e vôlei com estrutura completa
                    </p>
                    <div className="bg-[#E2E2E2] p-4 rounded-md mb-4">
                      <h4 className="font-bold text-[#002720] mb-2">Valores</h4>
                      <p className="text-[#401F16]">
                        <span className="font-semibold">R$ 130,00</span> - 01:00 hora
                      </p>
                    </div>
                    <Link
                      href="https://gripo.app/reservar/pelea-deportes-y-bar-santa-maria-rs"
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      AGENDE SUA QUADRA
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={400} className="md:col-span-2">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="aspect-video bg-[#002720]/10 relative image-hover">
                      <Image
                        src="/quadra-areia-externa.jpeg"
                        alt="Quadra de areia externa"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-video bg-[#002720]/10 relative image-hover">
                      <Image
                        src="/quadra-areia-interna-2.jpeg"
                        alt="Quadra de areia interna"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Nossas Instalações</h3>
                    <p className="text-[#401F16] mb-4">
                      Contamos com quadras internas e externas para sua prática esportiva em qualquer condição climática
                    </p>
                    <Link
                      href="https://gripo.app/reservar/pelea-deportes-y-bar-santa-maria-rs"
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      AGENDE SUA QUADRA
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>
            </AnimatedGroup>
          </TabsContent>

          {/* Salão e Espaços Tab */}
          <TabsContent
            value="salao"
            id="salao"
            className="focus-visible:outline-none focus-visible:ring-0 scroll-mt-24"
          >
            <AnimatedGroup className="text-center mb-10" staggerDelay={150} baseDelay={100}>
              <AnimatedTitle className="text-3xl font-bold text-[#002720] mb-2">Salão e Espaços de Lazer</AnimatedTitle>
              <AnimatedElement animation="fade-up">
                <p className="text-lg text-[#401F16] max-w-2xl mx-auto">
                  O ambiente perfeito para seus eventos e momentos de descontração
                </p>
              </AnimatedElement>
            </AnimatedGroup>

            <AnimatedGroup className="grid md:grid-cols-2 gap-8" staggerDelay={200}>
              <AnimatedCard>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image src="/salao.jpeg" alt="Salão para eventos" fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Salão para Eventos</h3>
                    <p className="text-[#401F16] mb-4">Salão para eventos e confraternizações com estrutura completa</p>
                    <div className="bg-[#E2E2E2] p-4 rounded-md mb-4">
                      <h4 className="font-bold text-[#002720] mb-2">Valores</h4>
                      <ul className="space-y-1 text-[#401F16]">
                        <li>
                          Kit completo para El Asado: <span className="font-semibold">R$ 100,00</span>
                        </li>
                        <li>
                          Para horário fixo: <span className="font-semibold">R$ 50,00</span>
                        </li>
                        <li className="mt-2 text-sm italic">Turnos disponíveis para aluguel: diurno e noturno</li>
                      </ul>
                    </div>
                    <Link
                      href="https://wa.me/5555996061063?text=Olá! Gostaria de informações sobre o salão para eventos."
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      RESERVE SEU ESPAÇO
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={200}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image src="/quiosque1.jpeg" alt="Quiosques" fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Quiosques</h3>
                    <p className="text-[#401F16] mb-4">
                      Espaços confortáveis para reunir os amigos e fazer um churrasco
                    </p>
                    <div className="bg-[#E2E2E2] p-4 rounded-md mb-4">
                      <h4 className="font-bold text-[#002720] mb-2">Valores</h4>
                      <ul className="space-y-1 text-[#401F16]">
                        <li>
                          Kit básico para El Asado: <span className="font-semibold">R$ 25,00</span>
                        </li>
                        <li>
                          Para horário fixo: <span className="font-semibold">Grátis</span>
                        </li>
                      </ul>
                    </div>
                    <Link
                      href="https://wa.me/5555996061063?text=Olá! Gostaria de informações sobre os quiosques."
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      RESERVE SEU ESPAÇO
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={400}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image
                      src="/churrasqueira-externa.jpeg"
                      alt="Churrasqueiras externas"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Churrasqueiras Externas</h3>
                    <p className="text-[#401F16] mb-4">Espaço ideal para churrasco ao ar livre com os amigos</p>
                    <div className="bg-[#E2E2E2] p-4 rounded-md mb-4">
                      <p className="text-[#401F16] font-medium">Solicite informações para o agendamento.</p>
                    </div>
                    <Link
                      href="https://wa.me/5555996061063?text=Olá! Gostaria de informações sobre as churrasqueiras externas."
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      RESERVE SEU ESPAÇO
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={600}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image
                      src="/espaco-lazer-externo.jpeg"
                      alt="Informações adicionais"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Informações Adicionais</h3>
                    <div className="space-y-4 text-[#401F16]">
                      <div className="bg-[#E2E2E2] p-4 rounded-md">
                        <p className="font-medium">Terá atração musical?</p>
                        <p>Temos som para alugar. Consulte valores e disponibilidade.</p>
                      </div>
                      <div className="bg-[#E2E2E2] p-4 rounded-md">
                        <p className="font-medium text-red-600">Importante:</p>
                        <p>É expressamente proibido o consumo de bebidas trazidas de fora do estabelecimento.</p>
                      </div>
                    </div>
                    <Link
                      href="https://wa.me/5555996061063?text=Olá! Gostaria de mais informações sobre os espaços para eventos."
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center mt-4 hover:scale-[1.02] duration-300"
                    >
                      SAIBA MAIS
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>
            </AnimatedGroup>
          </TabsContent>

          {/* Aulas Tab */}
          <TabsContent
            value="aulas"
            id="aulas"
            className="focus-visible:outline-none focus-visible:ring-0 scroll-mt-24"
          >
            <AnimatedGroup className="text-center mb-10" staggerDelay={150} baseDelay={100}>
              <AnimatedTitle className="text-3xl font-bold text-[#002720] mb-2">Aulas nas Quadras</AnimatedTitle>
              <AnimatedElement animation="fade-up">
                <p className="text-lg text-[#401F16] max-w-2xl mx-auto">
                  Aprenda e evolua com os melhores profissionais
                </p>
              </AnimatedElement>
            </AnimatedGroup>

            <AnimatedCard className="mb-12">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#002720] mb-4 text-center">PACOTES DE AULAS</h3>
                  <p className="text-[#401F16] mb-6 text-center italic">
                    "Todos os valores são cobrados individualmente por pessoa"
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <AnimatedElement animation="fade-up" delay={200}>
                      <div>
                        <h4 className="text-lg font-bold text-[#002720] mb-4 pb-2 border-b border-[#002720]/20">
                          BEACH TENNIS
                        </h4>
                        <div className="space-y-6">
                          <div>
                            <h5 className="font-medium text-[#002720]">Aulas Avulsas</h5>
                            <ul className="mt-2 space-y-1 text-[#401F16]">
                              <li>
                                Individual / Personalizada: <span className="font-semibold">R$ 90,00</span>
                              </li>
                              <li>
                                Em Dupla: <span className="font-semibold">R$ 70,00</span> por pessoa
                              </li>
                              <li>
                                3 ou + Pessoas: <span className="font-semibold">R$ 50,00</span> por pessoa
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium text-[#002720]">Pacote 5 aulas</h5>
                            <ul className="mt-2 space-y-1 text-[#401F16]">
                              <li>
                                Individual / Personalizada: <span className="font-semibold">R$ 380,00</span>
                              </li>
                              <li>
                                Dupla: <span className="font-semibold">R$ 275,00</span> por pessoa
                              </li>
                              <li>
                                3 ou + Pessoas: <span className="font-semibold">R$ 230,00</span> por pessoa
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium text-[#002720]">Pacote 8 aulas</h5>
                            <ul className="mt-2 space-y-1 text-[#401F16]">
                              <li>
                                Individual / Personalizada: <span className="font-semibold">R$ 580,00</span>
                              </li>
                              <li>
                                Dupla: <span className="font-semibold">R$ 450,00</span> por pessoa
                              </li>
                              <li>
                                3 ou + Pessoas: <span className="font-semibold">R$ 350,00</span> por pessoa
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AnimatedElement>

                    <AnimatedElement animation="fade-up" delay={400}>
                      <div>
                        <h4 className="text-lg font-bold text-[#002720] mb-4 pb-2 border-b border-[#002720]/20">
                          FUTEVÔLEI
                        </h4>
                        <div className="space-y-6">
                          <div>
                            <h5 className="font-medium text-[#002720]">Personal</h5>
                            <ul className="mt-2 space-y-1 text-[#401F16]">
                              <li>
                                Avulsa: <span className="font-semibold">R$ 40,00</span>
                              </li>
                              <li>
                                Pacote 4 aulas: <span className="font-semibold">R$ 140,00</span>
                              </li>
                              <li>
                                Pacote 8 aulas: <span className="font-semibold">R$ 240,00</span>
                              </li>
                              <li>
                                Pacote 12 aulas: <span className="font-semibold">R$ 340,00</span>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium text-[#002720]">Duplas / Trios</h5>
                            <ul className="mt-2 space-y-1 text-[#401F16]">
                              <li>
                                Avulsa: <span className="font-semibold">R$ 35,00</span>
                              </li>
                              <li>
                                Pacote 4 aulas: <span className="font-semibold">R$ 120,00</span>
                              </li>
                              <li>
                                Pacote 8 aulas: <span className="font-semibold">R$ 180,00</span>
                              </li>
                              <li>
                                Pacote 12 aulas: <span className="font-semibold">R$ 240,00</span>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium text-[#002720]">GRUPOS</h5>
                            <p className="text-sm text-[#401F16] italic mb-2">(Agendamento via grupo do WhatsApp)</p>
                            <ul className="mt-2 space-y-1 text-[#401F16]">
                              <li>
                                Aula avulsa: <span className="font-semibold">R$ 30,00</span>
                              </li>
                              <li>
                                Pacote 4 aulas: <span className="font-semibold">R$ 90,00</span>
                              </li>
                              <li>
                                Pacote 8 aulas: <span className="font-semibold">R$ 150,00</span>
                              </li>
                              <li>
                                Pacote 12 aulas: <span className="font-semibold">R$ 200,00</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AnimatedElement>
                  </div>

                  <AnimatedElement animation="fade-up" delay={600}>
                    <div className="mt-8 p-4 bg-[#002720]/5 rounded-md">
                      <ul className="space-y-1 text-[#401F16]">
                        <li>
                          <span className="font-semibold">Aula Experimental:</span> Gratuita
                        </li>
                        <li>
                          <span className="font-semibold">Aula avulsa geral:</span> R$ 30,00
                        </li>
                        <li>
                          <span className="font-semibold">Planos de 2 a 6 vezes na semana</span> — é preciso consultar
                          valores e condições.
                        </li>
                      </ul>
                    </div>
                  </AnimatedElement>

                  <AnimatedElement animation="fade-up" delay={800}>
                    <div className="mt-6 flex justify-center">
                      <Link
                        href="https://wa.me/5555996061063?text=Olá! Gostaria de informações sobre as aulas e pacotes disponíveis."
                        target="_blank"
                        className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-6 py-3 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors hover:scale-105 duration-300"
                      >
                        AGENDE SUA AULA
                        <WhatsAppIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </AnimatedElement>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedGroup className="grid md:grid-cols-2 gap-8" staggerDelay={200}>
              <AnimatedCard>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image src="/quadra-areia-interna.jpeg" alt="Aulas de futevôlei" fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Aulas de Futevôlei</h3>
                    <p className="text-[#401F16] mb-4">
                      Aulas de futevôlei para iniciantes e avançados com metodologia especializada
                    </p>
                    <Link
                      href="https://wa.me/5555996061063?text=Olá! Gostaria de informações sobre as aulas de futevôlei."
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      CONHEÇA NOSSAS AULAS
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={200}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image
                      src="/quadra-areia-interna-2.jpeg"
                      alt="Aulas de beach tennis"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Aulas de Beach Tennis</h3>
                    <p className="text-[#401F16] mb-4">
                      Beach tennis com metodologia especializada para todos os níveis
                    </p>
                    <Link
                      href="https://wa.me/5555996061063?text=Olá! Gostaria de informações sobre as aulas de beach tennis."
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      CONHEÇA NOSSAS AULAS
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>
            </AnimatedGroup>
          </TabsContent>

          {/* PPF Tab */}
          <TabsContent value="ppf" id="ppf" className="focus-visible:outline-none focus-visible:ring-0 scroll-mt-24">
            <AnimatedGroup className="text-center mb-10" staggerDelay={150} baseDelay={100}>
              <AnimatedTitle className="text-3xl font-bold text-[#002720] mb-2">PPF - Pelea Performance</AnimatedTitle>
              <AnimatedElement animation="fade-up">
                <p className="text-lg text-[#401F16] max-w-2xl mx-auto">
                  Treinamento especializado para alta performance
                </p>
              </AnimatedElement>
            </AnimatedGroup>

            <AnimatedGroup className="grid md:grid-cols-2 gap-8" staggerDelay={200}>
              <AnimatedCard>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image src="/ppf-v4-fundo.png" alt="Treinamento funcional" fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Treinamento Funcional</h3>
                    <p className="text-[#401F16] mb-4">Treinamento funcional para grupos com foco em resultados</p>
                    <Link
                      href="https://www.instagram.com/_pelea/"
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      COMECE SEU TREINAMENTO
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={200}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image src="/ppf-espaco2.jpeg" alt="Avaliação física" fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Avaliação e Acompanhamento</h3>
                    <p className="text-[#401F16] mb-4">
                      Avaliação e acompanhamento personalizado para maximizar resultados
                    </p>
                    <Link
                      href="https://www.instagram.com/_pelea/"
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      COMECE SEU TREINAMENTO
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={400}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image src="/ppf-espaco.jpeg" alt="Equipamentos" fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Equipamentos de Última Geração</h3>
                    <p className="text-[#401F16] mb-4">Equipamentos de última geração para seu desenvolvimento</p>
                    <Link
                      href="https://www.instagram.com/_pelea/"
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      COMECE SEU TREINAMENTO
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={600}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image src="/ppf-v4-fundo.png" alt="Resultados" fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Resultados Comprovados</h3>
                    <p className="text-[#401F16] mb-4">
                      Resultados comprovados e metodologia exclusiva para seu sucesso
                    </p>
                    <Link
                      href="https://www.instagram.com/_pelea/"
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      COMECE SEU TREINAMENTO
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>
            </AnimatedGroup>
          </TabsContent>

          {/* Diferenciais Tab */}
          <TabsContent
            value="diferenciais"
            id="diferenciais"
            className="focus-visible:outline-none focus-visible:ring-0 scroll-mt-24"
          >
            <AnimatedGroup className="text-center mb-10" staggerDelay={150} baseDelay={100}>
              <AnimatedTitle className="text-3xl font-bold text-[#002720] mb-2">
                Por que escolher o Pelea?
              </AnimatedTitle>
              <AnimatedElement animation="fade-up">
                <p className="text-lg text-[#401F16] max-w-2xl mx-auto">
                  Experiência completa para seu esporte e lazer
                </p>
              </AnimatedElement>
            </AnimatedGroup>

            <AnimatedGroup className="grid md:grid-cols-2 gap-8" staggerDelay={200}>
              <AnimatedCard>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image
                      src="/quadra-areia-interna.jpeg"
                      alt="Estrutura de qualidade"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Estrutura de Qualidade</h3>
                    <p className="text-[#401F16] mb-4">Quadras com padrão profissional e manutenção constante</p>
                    <Link
                      href="https://wa.me/5555996061063?text=Olá! Gostaria de conhecer a estrutura do Pelea."
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      FALE CONOSCO
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={200}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image
                      src="/quadra-areia-interna-2.jpeg"
                      alt="Professores qualificados"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Equipe Qualificada</h3>
                    <p className="text-[#401F16] mb-4">Equipe de instrutores qualificados e experientes</p>
                    <Link
                      href="https://wa.me/5555996061063?text=Olá! Gostaria de conhecer a equipe de instrutores do Pelea."
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      FALE CONOSCO
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={400}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image
                      src="/churrasqueira-externa.jpeg"
                      alt="Ambiente descontraído"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Ambiente Descontraído</h3>
                    <p className="text-[#401F16] mb-4">Ambiente descontraído com bar completo e churrasco</p>
                    <Link
                      href="https://wa.me/5555996061063?text=Olá! Gostaria de conhecer o ambiente do Pelea."
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      FALE CONOSCO
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={600}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video bg-[#002720]/10 relative image-hover">
                    <Image
                      src="/espaco-lazer-externo.jpeg"
                      alt="Eventos e confraternizações"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-2">Espaço para Eventos</h3>
                    <p className="text-[#401F16] mb-4">Espaço ideal para eventos e confraternizações</p>
                    <Link
                      href="https://wa.me/5555996061063?text=Olá! Gostaria de informações sobre o espaço para eventos do Pelea."
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-4 py-2 rounded-md font-medium hover:bg-[#F2F5B4]/90 transition-colors w-full justify-center hover:scale-[1.02] duration-300"
                    >
                      FALE CONOSCO
                      <WhatsAppIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedCard>
            </AnimatedGroup>
          </TabsContent>

          {/* Contato Tab */}
          <TabsContent
            value="contato"
            id="contato"
            className="focus-visible:outline-none focus-visible:ring-0 scroll-mt-24"
          >
            <AnimatedGroup className="text-center mb-10" staggerDelay={150} baseDelay={100}>
              <AnimatedTitle className="text-3xl font-bold text-[#002720] mb-2">Venha para o Pelea</AnimatedTitle>
              <AnimatedElement animation="fade-up">
                <p className="text-lg text-[#401F16] max-w-2xl mx-auto">Estamos esperando por você</p>
              </AnimatedElement>
            </AnimatedGroup>

            <AnimatedGroup className="grid md:grid-cols-2 gap-8" staggerDelay={200}>
              <AnimatedCard>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover">
                  <div className="aspect-video w-full h-[400px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3462.5518714799166!2d-53.8257492!3d-29.6868611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9503cb5abc2f17d3%3A0x9c8304574d0468c5!2sR.%20Duque%20de%20Caxias%2C%202653%20-%20Santa%20Maria%2C%20RS%2C%2097060-210!5e0!3m2!1spt-BR!2sbr!4v1716151832!5m2!1spt-BR!2sbr!4v1716151832!5m2!1spt-BR!2sbr!4v1716151832!5m2!1spt-BR!2sbr"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#002720] mb-4">Informações de Contato</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <WhatsAppIcon className="h-5 w-5 text-[#002720]" />
                        <p className="text-[#401F16]">(55) 99606-1063</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-[#002720]" />
                        <p className="text-[#401F16]">Rua Duque de Caxias, 2653 - Santa Maria/RS</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-[#002720]" />
                        <p className="text-[#401F16]">Segunda a Domingo: 8h às 22h</p>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                      <Link
                        href="https://www.instagram.com/_pelea/"
                        target="_blank"
                        className="bg-[#002720] text-white p-2 rounded-full hover:bg-[#002720]/90 transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard delay={200}>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg card-hover p-6">
                  <h3 className="text-xl font-bold text-[#002720] mb-4">Entre em Contato</h3>
                  <p className="text-[#401F16] mb-6">
                    Estamos prontos para atender você e proporcionar a melhor experiência em esportes e lazer. Entre em
                    contato conosco para agendar sua visita, reservar uma quadra ou obter mais informações sobre nossos
                    serviços.
                  </p>
                  <Link
                    href="https://wa.me/5555996061063"
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 bg-[#F2F5B4] text-[#002720] px-6 py-4 rounded-md font-bold text-lg hover:bg-[#F2F5B4]/90 transition-colors w-full hover:scale-105 duration-300"
                  >
                    AGENDE PELO WHATSAPP
                    <WhatsAppIcon className="h-6 w-6" />
                  </Link>
                  <div className="mt-8">
                    <h4 className="font-bold text-[#002720] mb-2">Por que nos escolher?</h4>
                    <ul className="list-disc list-inside space-y-2 text-[#401F16]">
                      <li>Quadras profissionais com manutenção constante</li>
                      <li>Professores qualificados para diversas modalidades</li>
                      <li>Ambiente descontraído com bar completo</li>
                      <li>Espaço ideal para eventos e confraternizações</li>
                      <li>Localização privilegiada em Santa Maria</li>
                    </ul>
                  </div>
                </div>
              </AnimatedCard>
            </AnimatedGroup>
          </TabsContent>
        </Tabs>

        {/* CTA Final */}
        <section className="py-16 bg-[#002720]">
          <div className="container text-center">
            <AnimatedGroup staggerDelay={200}>
              <AnimatedTitle as="h2" className="text-3xl font-bold text-[#E2E2E2] mb-4">
                Pronto para viver a experiência Pelea?
              </AnimatedTitle>
              <AnimatedElement animation="fade-up">
                <p className="text-lg text-[#E2E2E2]/80 mb-8 max-w-2xl mx-auto">
                  Venha conhecer nosso espaço e aproveitar tudo o que temos a oferecer para sua prática esportiva e
                  momentos de lazer.
                </p>
              </AnimatedElement>
              <AnimatedElement animation="fade-up">
                <Link
                  href="https://wa.me/5555996061063"
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-[#F2F5B4] text-[#002720] px-8 py-4 rounded-md font-bold text-xl hover:bg-[#F2F5B4]/90 transition-all hover:scale-105 duration-300"
                >
                  AGENDE PELO WHATSAPP
                  <WhatsAppIcon className="h-6 w-6" />
                </Link>
              </AnimatedElement>
            </AnimatedGroup>
          </div>
        </section>
      </main>

      <footer className="bg-[#002720] py-8 text-[#E2E2E2]">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Image src="/logo.png" alt="Pelea Deportes y Bar" width={150} height={50} className="h-12 w-auto mb-4" />
              <p className="text-sm text-[#E2E2E2]/80 max-w-xs">
                Seu espaço completo para esportes e lazer em Santa Maria. Quadras profissionais, aulas especializadas e
                o melhor ambiente para seus momentos de diversão.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contato</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <WhatsAppIcon className="h-4 w-4" />
                  <p className="text-sm">(55) 99606-1063</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <p className="text-sm">Rua Duque de Caxias, 2653 - Santa Maria/RS</p>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <p className="text-sm">Segunda a Domingo: 8h às 22h</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Redes Sociais</h3>
              <div className="flex gap-4">
                <Link
                  href="https://www.instagram.com/_pelea/"
                  target="_blank"
                  className="bg-[#E2E2E2]/10 text-white p-2 rounded-full hover:bg-[#E2E2E2]/20 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#E2E2E2]/10 text-center text-sm text-[#E2E2E2]/60">
            <p>&copy; {new Date().getFullYear()} Pelea Deportes y Bar. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <Link
        href="https://wa.me/5555996061063"
        target="_blank"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20BD5C] transition-all hover:scale-110 duration-300 z-50"
        aria-label="Contato via WhatsApp"
      >
        <WhatsAppIcon className="h-6 w-6" />
      </Link>

      {/* Back to Top Button */}
      {typeof window !== "undefined" && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 left-6 bg-[#002720] text-white p-3 rounded-full shadow-lg hover:bg-[#002720]/90 transition-all hover:scale-110 duration-300 z-50 ${
            showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
