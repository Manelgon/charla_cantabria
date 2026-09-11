import { AFCADEMIA } from '@/shared/constants/evento'

export default function MoreSection() {
  return (
    <section className="lp-more">
      <div className="lp-container lp-more__inner">
        <div>
          <span className="lp-eyebrow lp-eyebrow--light">Sigue aprendiendo</span>
          <h2>¿Quieres ir más allá de la charla?</h2>
          <p>
            En AFCademIA encontrarás cursos completos para automatizar tu despacho con IA:
            formación práctica, certificada y pensada para administradores de fincas.
          </p>
        </div>
        <div className="lp-more__actions">
          <a href={AFCADEMIA.catalogo} target="_blank" rel="noopener noreferrer" className="lp-btn lp-btn--primary">
            Ver el catálogo de cursos
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href={AFCADEMIA.web} target="_blank" rel="noopener noreferrer" className="lp-more__secondary">
            Ir a afcademia.com <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
