'use client'

import { useState } from 'react'
import Footer from '@/shared/components/Footer'
import { EVENTO } from '@/shared/constants/evento'

const DELIVERABLES = [
  {
    num: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /><path d="M9 7h7M9 11h5" /></svg>
    ),
    title: 'Manual del Alumno',
    desc: 'Guía completa paso a paso para construir tu primera automatización de email desde cero.',
    tag: 'PDF Guía',
  },
  {
    num: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
    ),
    title: 'Cuaderno de Prácticas',
    desc: 'Ejercicios y plantillas para que practiques y consolides lo aprendido en la charla.',
    tag: 'Ejercicios',
  },
  {
    num: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M7 12l3-3 2 2 4-4" /></svg>
    ),
    title: 'Diapositivas de la Charla',
    desc: 'Todas las diapositivas de la sesión para que puedas repasar el contenido cuando quieras.',
    tag: 'Presentación',
  },
  {
    num: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
    ),
    title: 'Cheatsheet Make.com + IA',
    desc: 'Hoja de referencia rápida con los módulos, conexiones y prompts más usados. Tenla siempre a mano.',
    tag: 'Referencia rápida',
  },
  {
    num: '05',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.8 4.6L18.5 9.5l-4.7 1.9L12 16l-1.8-4.6L5.5 9.5l4.7-1.9L12 3z" /><path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" /><path d="M5 16l.6 1.4L7 18l-1.4.6L5 20l-.6-1.4L3 18l1.4-.6L5 16z" /></svg>
    ),
    title: 'Plantillas de Prompts',
    desc: 'Los 3 prompts listos para copiar y pegar en Make. Adaptables a tu despacho.',
    tag: 'Prompts IA',
  },
]

const STEPS = [
  { n: '1', title: 'Déjanos tu email', text: 'Nombre y correo. Nada más.' },
  { n: '2', title: 'Confirma desde tu bandeja', text: 'Te llega un email con un enlace seguro.' },
  { n: '3', title: 'Descarga los 5 materiales', text: 'En PDF y en versión web, para siempre.' },
]

export default function Home() {
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [privacyChecked, setPrivacyChecked] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !nombre) {
      setError('Por favor rellena nombre y email.')
      return
    }
    if (!privacyChecked) {
      setError('Debes aceptar la política de protección de datos.')
      return
    }
    setError('')
    setLoading(true)

    try {
      // Toda la lógica de BD vive en /api/lead (server-side, service_role).
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, privacyChecked }),
      })
      window.location.href = '/confirmar'
    } catch (err) {
      console.error('Error al registrar lead:', err)
      window.location.href = '/confirmar'
    }
  }

  return (
    <main className="lp">
      {/* HEADER */}
      <header className="lp-header">
        <div className="lp-container lp-header__inner">
          <a href="/" className="lp-brand" aria-label="AFCademía">
            <img src="/logo-afcademia.webp" alt="" width={36} height={36} />
            <span>AFC<em>ademia</em></span>
          </a>
          <div className="lp-header__event">
            <span className="lp-dot" />
            {EVENTO.ciudad} · {EVENTO.fecha}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero__bg" aria-hidden="true" />
        <div className="lp-hero__photo" aria-hidden="true">
          <img src="/hero-zaragoza.webp" alt="" width={1800} height={1013} />
        </div>

        <div className="lp-container lp-hero__inner">
          <span className="lp-eyebrow lp-eyebrow--light">
            Materiales exclusivos · Charla AFC {EVENTO.ciudad} · {EVENTO.organizadorCorto}
          </span>

          <h1 className="lp-hero__title">
            Tus materiales de la charla <span>te esperan aquí</span>
          </h1>

          <p className="lp-hero__lead">
            Introduce tu email y te los enviamos al instante. <strong>5 recursos</strong> para que
            apliques lo de hoy desde mañana en tu despacho: manual, prácticas, diapositivas,
            cheatsheet y prompts.
          </p>

          <div className="lp-hero__actions">
            <a href="#materiales-form" className="lp-btn lp-btn--primary">Quiero los materiales</a>
            <a href="#materiales" className="lp-hero__secondary">
              Ver qué incluye <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="lp-hero__meta">
            <div className="lp-meta">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <div>
                <b>{EVENTO.ciudad}</b>
                <small>{EVENTO.organizadorCorto}</small>
              </div>
            </div>
            <div className="lp-meta">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <div>
                <b>{EVENTO.fecha}</b>
                <small>{EVENTO.fechaLarga}</small>
              </div>
            </div>
            <span className="lp-hero__note">Gratis · Sin spam · En 1 minuto</span>
          </div>
        </div>

      </section>

      {/* MATERIALES */}
      <section className="lp-section lp-section--tiles" id="materiales">
        <div className="lp-container">
          <div className="lp-section__head">
            <span className="lp-eyebrow">Lo que te llevas</span>
            <h2>5 recursos listos para usar</h2>
            <p>Todo lo que viste en la charla, ordenado y descargable. Para repasar, practicar y aplicar.</p>
          </div>
        </div>

        <div className="lp-container">
          <div className="lp-tiles">
            {DELIVERABLES.map(d => (
              <article key={d.num} className="lp-tile">
                <span className="lp-tile__num" aria-hidden="true">{d.num}</span>
                <div className="lp-tile__icon">{d.icon}</div>
                <div className="lp-tile__body">
                  <span className="lp-tile__tag">{d.tag}</span>
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                  <a href="#materiales-form" className="lp-tile__link">
                    Conseguirlo <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section className="lp-section lp-section--form" id="materiales-form">
        <div className="lp-container lp-form__grid">
          <div className="lp-steps">
            <span className="lp-eyebrow">Cómo funciona</span>
            <h2>Tres pasos y listo</h2>
            <ol>
              {STEPS.map(s => (
                <li key={s.n}>
                  <span className="lp-steps__num">{s.n}</span>
                  <div>
                    <b>{s.title}</b>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lp-form">
            <div className="lp-form__head">
              <h2>Accede a los 5 materiales gratis</h2>
              <p>Te enviamos un email de confirmación. Al confirmar, accedes a todos los recursos.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="lp-field">
                <label htmlFor="nombre">Nombre *</label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  autoComplete="name"
                  required
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>
              <div className="lp-field">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              {error && <p className="lp-form__error" role="alert">{error}</p>}

              <label className="lp-check" htmlFor="privacy">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={privacyChecked}
                  onChange={e => setPrivacyChecked(e.target.checked)}
                />
                <span>
                  Acepto la{' '}
                  <a href="https://afcademia.com/politica-de-privacidad/" target="_blank" rel="noopener noreferrer">
                    política de protección de datos
                  </a>
                </span>
              </label>

              <button type="submit" className="lp-btn lp-btn--primary lp-btn--block" disabled={loading || !privacyChecked}>
                {loading ? 'Enviando...' : (
                  <>
                    Enviarme los materiales
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              <p className="lp-form__foot">Sin spam. Solo tus materiales. Puedes darte de baja cuando quieras.</p>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
