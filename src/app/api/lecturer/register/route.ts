// src/app/api/lecturer/register/route.ts

import { NextResponse } from "next/server";
import  pool  from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const {
      lecturer_id,
      first_name,
      last_name,
      email,
      password,
      department,
    } = await req.json();

    // Check if lecturer already exists
    const existingLecturer = await pool.query(
      "SELECT * FROM lecturers WHERE lecturer_id = $1 OR email = $2",
      [lecturer_id, email]
    );

    if (existingLecturer.rows.length > 0) {
      return NextResponse.json(
        { message: "Lecturer already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into table
    await pool.query(
      `INSERT INTO lecturers 
       (lecturer_id, first_name, last_name, email, password, department) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        lecturer_id,
        first_name,
        last_name,
        email,
        hashedPassword,
        department,
      ]
    );

    return NextResponse.json({ message: "Lecturer registered successfully" });
  } catch (error) {
    console.error("Lecturer Register Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}