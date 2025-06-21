// src/app/api/test-db/route.ts
import { NextResponse } from 'next/server'
import  pool from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM students LIMIT 5')
    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json({ error: 'Database connection failed', details: error }, { status: 500 })
  }
}
