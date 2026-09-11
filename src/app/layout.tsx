import type { Metadata } from 'next'
import { Inter, Fraunces, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })
const fraunces = Fraunces({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-display' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Charla AFC Zaragoza · Colegio de Aragón - Automatización de Emails con IA | AFCademía',
  description: 'Acceso a los materiales exclusivos de la charla sobre automatización de emails con IA para administradores de fincas. Manual, prácticas, diapositivas, cheatsheet y prompts listos para usar.',
  keywords: 'automatización, email, IA, AFC, Zaragoza, Aragón, administradores de fincas, Make.com',
  icons: {
    icon: '/logo-afcademia.webp',
    shortcut: '/logo-afcademia.webp',
    apple: '/logo-afcademia.webp',
  },
  openGraph: {
    title: 'Charla AFC Zaragoza - Automatización con IA',
    description: 'Tus 5 materiales exclusivos: Manual, Prácticas, Diapositivas, Cheatsheet y Prompts de IA.',
    type: 'website',
    url: 'https://aragoncolegioadministradores.afcademia.com',
    siteName: 'AFCademía',
    images: [
      {
        url: 'https://aragoncolegioadministradores.afcademia.com/hero-zaragoza.webp',
        width: 1400,
        height: 788,
        alt: 'AFCademía - Automatización de Emails con IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charla AFC Zaragoza - Automatización con IA',
    description: 'Tus 5 materiales exclusivos listos para descargar',
    creator: '@AFCademia',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${fraunces.variable} ${plexMono.variable}`}>{children}</body>
    </html>
  )
}
