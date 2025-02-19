import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AgroSync - Transformando o Agronegócio com IA e Metaverso",
  description:
    "AgroSync é uma startup inovadora que combina IA avançada e tecnologias do Metaverso para revolucionar o setor agrícola, aumentando eficiência, sustentabilidade e produtividade.",
  keywords: "AgroSync, Agronegócio, IA, Metaverso, Agricultura, Tecnologia",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>{children}</body>
    </html>
  )
}

