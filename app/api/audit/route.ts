import { NextResponse } from 'next/server'
import { db } from '@/lib/instant'
import { z } from 'zod'

const AuditSchema = z.object({
  severity: z.enum(['critical', 'high', 'medium', 'low']),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  category: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validated = AuditSchema.parse(body)

    await db.transact(async (tx) => {
      await tx.audits?.insert({
        ...validated,
        status: 'pending',
        timestamp: Date.now(),
      })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
