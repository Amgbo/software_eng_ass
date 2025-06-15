import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT NOW()');
    return NextResponse.json({ time: result.rows[0].now });
  } catch (error) {
    return NextResponse.json({ error: 'Database connection failed', details: error });
  }
}
export async function POST() {
  return NextResponse.json({ message: 'Login route is working!' });
}