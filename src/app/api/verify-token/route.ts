import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase/admin'

const Schema = z.object({ token: z.string().trim().min(8).max(200) })

// Verifica un token de descarga y lo marca como usado (sin bloquear reutilización: mejor UX).
export async function POST(request: NextRequest) {
  const parsed = Schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ status: 'invalid' })
  }

  const { data, error } = await supabaseAdmin
    .from('access_tokens')
    .select('id, used, expires_at, leads(nombre)')
    .eq('token', parsed.data.token)
    .eq('tipo', 'descarga')
    .maybeSingle()

  if (error || !data) {
    return NextResponse.json({ status: 'invalid' })
  }
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ status: 'expired' })
  }

  const lead = data.leads as unknown as { nombre?: string } | null
  if (!data.used) {
    await supabaseAdmin.from('access_tokens').update({ used: true }).eq('id', data.id)
  }

  return NextResponse.json({ status: 'valid', nombre: lead?.nombre ?? '' })
}
