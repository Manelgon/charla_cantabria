import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { EVENTO } from '@/shared/constants/evento'

const LeadSchema = z.object({
  nombre: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  privacyChecked: z.literal(true),
})

// Registra el lead, su paso por el embudo y garantiza un access_token activo.
// n8n/Make es notificado por el trigger de Supabase sobre access_tokens.
export async function POST(request: NextRequest) {
  const parsed = LeadSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos no válidos' }, { status: 400 })
  }
  const { nombre, email, privacyChecked } = parsed.data
  const now = new Date().toISOString()

  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads')
      .upsert(
        { nombre, email, source: EVENTO.source, privacy_accepted: privacyChecked, privacy_accepted_at: now },
        { onConflict: 'email', ignoreDuplicates: false }
      )
      .select('id')
      .single()
    if (leadError) throw leadError
    const leadId = lead.id

    const { data: existingFlujo, error: flujoLookupError } = await supabaseAdmin
      .from('flujos_embudo')
      .select('id')
      .eq('lead_id', leadId)
      .eq('nombre_flujo', EVENTO.flujo)
      .maybeSingle()
    if (flujoLookupError) throw flujoLookupError

    const isFirstTime = !existingFlujo
    const { error: flujoError } = await supabaseAdmin
      .from('flujos_embudo')
      .upsert(
        {
          lead_id: leadId,
          nombre_flujo: EVENTO.flujo,
          status_actual: isFirstTime ? 'nuevo' : 'recurrente',
          actividad: 'lead_activo',
          tags_proceso: [isFirstTime ? 'nuevo' : 'recurrente', ...EVENTO.tags],
          fecha_ultima_interaccion: now,
        },
        { onConflict: 'lead_id,nombre_flujo', ignoreDuplicates: false }
      )
    if (flujoError) throw flujoError

    const { data: existingToken, error: tokenLookupError } = await supabaseAdmin
      .from('access_tokens')
      .select('token')
      .eq('lead_id', leadId)
      .eq('tipo', 'descarga')
      .or('used.is.null,used.eq.false')
      .or(`expires_at.is.null,expires_at.gt.${now}`)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    if (tokenLookupError) throw tokenLookupError

    if (!existingToken) {
      const { error: tokenError } = await supabaseAdmin.from('access_tokens').insert({
        lead_id: leadId,
        tipo: 'descarga',
        metadata: { fuente: EVENTO.flujo, evento: EVENTO.nombre, nombre, email },
      })
      if (tokenError) throw tokenError
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[api/lead] Error al registrar lead:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
