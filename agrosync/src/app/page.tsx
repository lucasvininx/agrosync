"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, Menu, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { LineChart, Line as RechartsLine, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { SaibaMaisDialog } from "@/components/saiba-mais-dialog"
import { sectionsContent } from "@/app/data/sections-content"

const sections = [
  {
    id: "agroverse",
    name: "AgroVerse",
    description: "Treinamento em Realidade Virtual para Agricultura",
    image: "/img/agro_meta.jpg",
    cta: "Saiba Mais",
  },
  {
    id: "farmtwin",
    name: "FarmTwin",
    description: "Gêmeos Digitais de Fazendas",
    image: "/img/fazenda_meta.jpg",
    cta: "Conheça o Conceito",
  },
  {
    id: "cropai",
    name: "CropAI",
    description: "IA para Previsão de Safras",
    image: "/img/ia_fazenda.jpg",
    cta: "Explore o Futuro",
  },
  {
    id: "ecotrack",
    name: "EcoTrack",
    description: "Monitoramento Sustentável de Cultivos",
    image: "/img/monitoramento_fazenda.jpg",
    cta: "Descubra Mais",
  },
  {
    id: "impacto",
    name: "Nosso Impacto",
    description: "Transformando o Agronegócio com Dados Reais",
    stats: [
      {
        value: 35,
        label: "Aumento de Produtividade",
        suffix: "%",
        description: "em fazendas que utilizam nossas soluções",
      },
      {
        value: 2.5,
        label: "Milhões de Hectares",
        suffix: "M",
        description: "monitorados por nossa tecnologia",
      },
      {
        value: 40,
        label: "Economia de Água",
        suffix: "%",
        description: "através de irrigação inteligente",
      },
      {
        value: 98,
        label: "Precisão em Previsões",
        suffix: "%",
        description: "usando nossos modelos de IA",
      },
    ],
  },
  {
    id: "missao",
    name: "Missão",
    description: "Transformando o Agronegócio com Tecnologia",
    content:
      "Nossa missão é impulsionar o agronegócio por meio da inovação tecnológica sustentável, transformando dados e inteligência em decisões práticas que elevem a produtividade, reduzam impactos ambientais e fortaleçam a comunidade agrícola. Nosso compromisso é conectar tradição e tecnologia para criar um futuro próspero, resiliente e integrado, onde cada ação no campo contribua para o bem-estar das gerações presentes e futuras",
  },
  {
    id: "quemsomos",
    name: "Quem Somos",
    description: "Inovadores em Agrotecnologia",
    content:
      "...",
  },
]

const growthData = [
  { year: 2025, tradicional: 100, agrosync: 100 },
  { year: 2026, tradicional: 105, agrosync: 135 },
  { year: 2027, tradicional: 110, agrosync: 182 },
  { year: 2028, tradicional: 115, agrosync: 246 },
  { year: 2029, tradicional: 120, agrosync: 332 },
  { year: 2030, tradicional: 125, agrosync: 448 },
]

function CountUpNumber({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      if (progress < duration) {
        const percentage = progress / duration
        setCount(Math.floor(end * percentage))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, isVisible])

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  )
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState<keyof typeof sectionsContent | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const sectionIndex = Math.floor(scrollPosition / windowHeight)
      setCurrentSection(sectionIndex)

      const header = document.querySelector("header")
      if (header) {
        if (scrollPosition > 50) {
          header.classList.add("bg-opacity-80", "backdrop-blur-md")
          header.classList.remove("bg-opacity-0")
        } else {
          header.classList.remove("bg-opacity-80", "backdrop-blur-md")
          header.classList.add("bg-opacity-0")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMenuOpen(false)
  }

  const handleSaibaMais = (sectionId: string) => {
    if (sectionId in sectionsContent) {
      setSelectedSection(sectionId as keyof typeof sectionsContent)
      setDialogOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-md bg-black bg-opacity-0">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Agro<span className="text-green-500">Sync</span>
          </h1>
          <div className="hidden md:flex space-x-6">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                onClick={() => scrollToSection(section.id)}
                className="hover:text-green-500 transition-colors"
              >
                {section.name}
              </Button>
            ))}
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contato")}
              className="hover:text-green-500 transition-colors"
            >
              Contato
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(true)}>
            <Menu />
          </Button>
        </nav>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 p-4 bg-black backdrop-blur-md">
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
              <X />
            </Button>
          </div>
          <nav className="flex flex-col items-center space-y-4 mt-12">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                className="text-xl hover:text-green-500"
                onClick={() => scrollToSection(section.id)}
              >
                {section.name}
              </Button>
            ))}
            <Button variant="ghost" className="text-xl hover:text-green-500" onClick={() => scrollToSection("contato")}>
              Contato
            </Button>
          </nav>
        </div>
      )}

      <main className="relative">
        {sections.map((section, index) => (
          <section key={section.id} id={section.id} className="min-h-screen relative flex items-center justify-center">
            {section.image && (
              <>
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                    currentSection === index ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ backgroundImage: `url(${section.image})` }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-80" />
              </>
            )}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold mb-6 text-white">{section.name}</h2>
              <p className="text-xl mb-8 text-white">{section.description}</p>

              {section.stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                  {section.stats.map((stat, i) => (
                    <Card key={i} className="p-6 bg-black bg-opacity-70 border border-white/20">
                      <div className="text-4xl font-bold mb-2 text-green-500">
                        <CountUpNumber end={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-xl font-semibold mb-2 text-white">{stat.label}</div>
                      <div className="text-sm text-white/80">{stat.description}</div>
                    </Card>
                  ))}
                </div>
              )}

              {section.id === "impacto" && (
                <Card className="mt-16 bg-black bg-opacity-70 border border-white/20 p-8">
                  <h3 className="text-2xl font-bold mb-6 text-white">Projeção de Crescimento de Produtividade</h3>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={growthData}>
                        <XAxis dataKey="year" stroke="#fff" axisLine={false} tickLine={false} />
                        <YAxis stroke="#fff" tickFormatter={(value) => `${value}%`} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            borderRadius: "8px",
                          }}
                          labelStyle={{
                            color: "#fff",
                          }}
                        />
                        <RechartsLine
                          type="monotone"
                          dataKey="tradicional"
                          name="Agricultura Tradicional"
                          stroke="#888"
                          strokeWidth={2}
                          dot={false}
                        />
                        <RechartsLine
                          type="monotone"
                          dataKey="agrosync"
                          name="Com AgroSync"
                          stroke="#22c55e"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}

              {section.cta && (
                <Button
                  variant="outline"
                  size="lg"
                  className="mt-8 bg-white text-black hover:bg-green-500 hover:text-white transition-colors"
                  onClick={() => handleSaibaMais(section.id)}
                >
                  {section.cta}
                </Button>
              )}

              {section.content && <p className="max-w-3xl mx-auto text-lg mt-8 text-white">{section.content}</p>}
            </div>
            {index === 0 && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <ChevronDown className="text-white w-8 h-8" />
              </div>
            )}
          </section>
        ))}

        <section id="contato" className="min-h-screen flex items-center justify-center relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("/placeholder.svg?height=1080&width=1920")' }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-80" />
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-5xl font-bold mb-8 text-center text-white">Contato</h2>
            <form className="max-w-lg mx-auto space-y-4">
              <Input
                type="text"
                placeholder="Nome"
                className="bg-black bg-opacity-70 border border-white/20 text-white placeholder-white/50"
              />
              <Input
                type="email"
                placeholder="Email"
                className="bg-black bg-opacity-70 border border-white/20 text-white placeholder-white/50"
              />
              <Textarea
                placeholder="Mensagem"
                className="bg-black bg-opacity-70 border border-white/20 text-white placeholder-white/50"
              />
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white">
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </section>
      </main>

      {selectedSection && (
        <SaibaMaisDialog
          isOpen={dialogOpen}
          onClose={() => {
            setDialogOpen(false)
            setSelectedSection(null)
          }}
          title={sectionsContent[selectedSection].title}
          content={sectionsContent[selectedSection].content}
        />
      )}
      <footer className="py-8 bg-black border-t border-white/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white">&copy; 2025 AgroSync. Todos os direitos reservados.</p>
          <p className="mt-2 text-white/80">Transformando o futuro do agronegócio com IA e Metaverso</p>
        </div>
      </footer>
    </div>
  )
}

