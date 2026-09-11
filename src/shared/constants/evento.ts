// Datos del evento actual. Cambiar aquí al reutilizar la landing para otra charla.
export const EVENTO = {
  ciudad: 'Zaragoza',
  organizador: 'Colegio de Administradores de Fincas de Aragón',
  organizadorCorto: 'Colegio de Aragón',
  fecha: '25/09',
  fechaLarga: '25 de septiembre',
  nombre: 'Automatiza tu email - AFC Zaragoza 2026',
  source: 'Charla AFC Zaragoza 2026',
  flujo: 'materiales-charla-zaragoza-2026',
  tags: ['charla-zaragoza-2026', 'automatiza-email'],
} as const

export const AFCADEMIA = {
  web: 'https://afcademia.com',
  catalogo: 'https://afcademia.com/tienda/',
} as const

export const PONENTE = {
  nombre: 'Roberto Díaz',
  rol: 'Administrador de fincas en ejercicio y formador en AFCademIA',
  bio: 'Automatizó su propio despacho y hoy enseña a otros administradores a hacer lo mismo. Los flujos que construyó trabajan cada día en su gestión con Make, Power Automate y Microsoft 365, y son la base de lo que enseña: automatizaciones reales, con un antes y un después medible en horas y en errores.',
  claves: [
    { titulo: 'Práctica, no teoría', texto: 'Enseña los flujos que él mismo usa cada día en su despacho, no diapositivas.' },
    { titulo: 'Del sector, para el sector', texto: 'Habla tu idioma: remesas, incidencias, juntas, comunicaciones a propietarios.' },
    { titulo: 'Tiempo recuperado', texto: 'Crecer gestionando más fincas sin multiplicar el equipo ni el estrés.' },
  ],
} as const
