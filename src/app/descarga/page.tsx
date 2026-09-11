'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Footer from '@/shared/components/Footer'
import SiteHeader from '@/shared/components/SiteHeader'
import MoreSection from '@/shared/components/MoreSection'
import MaterialIcon from '@/shared/components/MaterialIcon'
import { MATERIALES, type Material } from '@/shared/constants/materiales'

type Status = 'loading' | 'valid' | 'invalid' | 'expired'

const downloadUrl = (path: string) => `/api/download?file=${encodeURIComponent(path.split('/').pop() ?? '')}`

function MaterialCard({ m }: { m: Material }) {
  return (
    <article className="lp-dl__card">
      <div className="lp-dl__icon"><MaterialIcon num={m.num} /></div>
      <div className="lp-dl__body">
        <span className="lp-tile__tag">{m.tag} · Material {m.num}</span>
        <h3>{m.title}</h3>
        <p>{m.subtitle}</p>
      </div>
      <div className="lp-dl__actions">
        <a href={m.html} target="_blank" rel="noopener noreferrer" className="lp-dl__btn lp-dl__btn--ghost">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><path d="M15 3h6v6" /><path d="M10 14L21 3" /></svg>
          Abrir online
        </a>
        <a href={downloadUrl(m.pdf)} className="lp-dl__btn lp-dl__btn--primary">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>
          Descargar PDF
        </a>
        <a href={downloadUrl(m.html)} className="lp-dl__btn lp-dl__btn--ghost">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>
          HTML
        </a>
      </div>
    </article>
  )
}

function Notice({ icon, title, text, cta }: { icon: React.ReactNode; title: string; text: string; cta: string }) {
  return (
    <section className="lp-section">
      <div className="lp-container lp-dl__notice">
        <div className="lp-dl__notice-icon">{icon}</div>
        <h1>{title}</h1>
        <p>{text}</p>
        <a href="/" className="lp-btn lp-btn--primary">{cta}</a>
      </div>
    </section>
  )
}

const LockIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
)
const ClockIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
)

function DescargaContent() {
  const params = useSearchParams()
  const token = params.get('token')
  const [status, setStatus] = useState<Status>('loading')
  const [nombre, setNombre] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('invalid')
      return
    }
    const verify = async () => {
      try {
        const res = await fetch('/api/verify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })
        const data = (await res.json()) as { status: Status; nombre?: string }
        if (data.nombre) setNombre(data.nombre)
        setStatus(data.status ?? 'invalid')
      } catch {
        setStatus('invalid')
      }
    }
    verify()
  }, [token])

  if (status === 'loading') {
    return (
      <div className="lp-dl__loading">
        <span className="lp-dl__spinner" />
        <p>Verificando acceso...</p>
      </div>
    )
  }

  if (status === 'invalid') {
    return (
      <Notice
        icon={LockIcon}
        title="Enlace no válido"
        text="Este enlace no existe o ya no es válido. Vuelve al formulario para solicitar los materiales de nuevo."
        cta="Volver al formulario"
      />
    )
  }

  if (status === 'expired') {
    return (
      <Notice
        icon={ClockIcon}
        title="Enlace caducado"
        text="Este enlace tenía una validez de 7 días y ha expirado. Solicita los materiales de nuevo y te enviamos un enlace nuevo al instante."
        cta="Solicitar de nuevo"
      />
    )
  }

  const raw = nombre.trim().split(' ')[0]
  const firstName = raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : ''

  return (
    <>
      <section className="lp-hero lp-hero--compact">
        <div className="lp-hero__bg" aria-hidden="true" />
        <div className="lp-hero__photo" aria-hidden="true">
          <img src="/hero-zaragoza.webp" alt="" width={1800} height={1013} />
        </div>
        <div className="lp-container lp-hero__inner">
          <span className="lp-eyebrow lp-eyebrow--light">Acceso confirmado · Tus materiales</span>
          <h1 className="lp-hero__title">
            {firstName ? `¡Hola ${firstName}!` : '¡Hola!'} <span>Aquí tienes tus materiales</span>
          </h1>
          <p className="lp-hero__lead">
            Todo lo que necesitas para empezar a automatizar tus emails desde mañana. Ábrelos online
            o descárgalos en PDF para tenerlos siempre a mano.
          </p>
        </div>
      </section>

      <section className="lp-section lp-section--tiles">
        <div className="lp-container">
          <div className="lp-dl__list">
            {MATERIALES.map(m => <MaterialCard key={m.num} m={m} />)}
          </div>
          <p className="lp-dl__help">
            ¿Algún problema con las descargas? Escríbenos a{' '}
            <a href="mailto:cursos@afcademia.com">cursos@afcademia.com</a>
          </p>
        </div>
      </section>

      <MoreSection />
    </>
  )
}

export default function DescargaPage() {
  return (
    <main className="lp">
      <SiteHeader />
      <Suspense fallback={<div className="lp-dl__loading"><span className="lp-dl__spinner" /><p>Cargando...</p></div>}>
        <DescargaContent />
      </Suspense>
      <Footer />
    </main>
  )
}
