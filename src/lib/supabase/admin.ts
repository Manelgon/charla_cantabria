import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Cliente con service_role. SOLO se importa desde rutas de servidor (app/api/**).
// NUNCA debe acabar en un componente 'use client' ni en el bundle del navegador.
// La service_role key salta RLS, por eso vive en una env var sin prefijo NEXT_PUBLIC.
//
// Se crea de forma perezosa: si se instanciara al cargar el módulo, `next build`
// fallaría al recolectar datos de las rutas cuando las env vars no están definidas.
let client: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en las variables de entorno')
  }
  client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
  return client
}
