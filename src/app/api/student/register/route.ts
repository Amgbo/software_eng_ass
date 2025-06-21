// src/app/api/student/register/route.ts

import { NextResponse } from "next/server";
import  pool  from "@/lib/db"; // assumes you have a db.ts with PostgreSQL connection
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const {
      student_id,
      first_name,
      last_name,
      email,
      phone,
      address,
      date_of_birth,
      gender,
      password,
    } = await req.json();

    // Check if student already exists
    const existingStudent = await pool.query(
      "SELECT * FROM students WHERE student_id = $1 OR email = $2",
      [student_id, email]
    );
    if (existingStudent.rows.length > 0) {
      return NextResponse.json(
        { message: "Student already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert student
    await pool.query(
      `INSERT INTO students (student_id, first_name, last_name, email, phone, address, date_of_birth, gender, password)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        student_id,
        first_name,
        last_name,
        email,
        phone,
        address,
        date_of_birth,
        gender,
        hashedPassword,
      ]
    );

    return NextResponse.json({ message: "Student registered successfully" });
  } catch (error) {
    console.error("Student Register Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
