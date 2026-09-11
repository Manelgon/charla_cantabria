import { EVENTO, AFCADEMIA } from '@/shared/constants/evento'

export default function SiteHeader() {
  return (
    <header className="lp-header">
      <div className="lp-container lp-header__inner">
        <a href="/" className="lp-brand" aria-label="AFCademía">
          <img src="/logo-afcademia.webp" alt="" width={36} height={36} />
          <span>AFC<em>ademia</em></span>
        </a>
        <nav className="lp-header__nav">
          <a href={AFCADEMIA.catalogo} target="_blank" rel="noopener noreferrer" className="lp-header__link">
            Catálogo de cursos
          </a>
          <div className="lp-header__event">
            <span className="lp-dot" />
            {EVENTO.ciudad} · {EVENTO.fecha}
          </div>
        </nav>
      </div>
    </header>
  )
}
