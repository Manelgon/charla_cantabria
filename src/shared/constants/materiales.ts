// Los cinco materiales de la charla. Los archivos viven en /public y se sirven
// por /api/download (whitelist). Cambiar aquí si cambian los entregables.
export const MATERIALES = [
  {
    num: '01',
    title: 'Manual del Alumno',
    tag: 'PDF Guía',
    subtitle: 'Construye tu automatización paso a paso',
    desc: 'Guía completa paso a paso para construir tu primera automatización de email desde cero.',
    html: '/01 Manual del Alumno.html',
    pdf: '/Manual del Alumno · Construye tu automatización paso a paso · AFCademIA.pdf',
  },
  {
    num: '02',
    title: 'Cuaderno de Prácticas',
    tag: 'Ejercicios',
    subtitle: 'Ejercicios para consolidar lo aprendido',
    desc: 'Ejercicios y plantillas para que practiques y consolides lo aprendido en la charla.',
    html: '/02 Cuaderno de Practicas.html',
    pdf: '/Cuaderno de prácticas · AFCademIA.pdf',
  },
  {
    num: '03',
    title: 'Diapositivas de la Charla',
    tag: 'Presentación',
    subtitle: 'Automatización de emails con IA',
    desc: 'Todas las diapositivas de la sesión para que puedas repasar el contenido cuando quieras.',
    html: '/03 Diapositivas.html',
    pdf: '/Diapositivas · Automatización emails con IA · AFCademIA.pdf',
  },
  {
    num: '04',
    title: 'Cheatsheet Make.com + IA',
    tag: 'Referencia rápida',
    subtitle: 'Referencia rápida siempre a mano',
    desc: 'Hoja de referencia rápida con los módulos, conexiones y prompts más usados. Tenla siempre a mano.',
    html: '/04 Cheatsheet.html',
    pdf: '/Cheatsheet · Make.com + IA · AFCademIA.pdf',
  },
  {
    num: '05',
    title: 'Plantillas de Prompts',
    tag: 'Prompts IA',
    subtitle: 'Los 3 prompts listos para copiar y pegar',
    desc: 'Los 3 prompts listos para copiar y pegar en Make. Adaptables a tu despacho.',
    html: '/05 Plantillas Prompts.html',
    pdf: '/Plantillas de prompts · AFCademIA.pdf',
  },
] as const

export type Material = (typeof MATERIALES)[number]
