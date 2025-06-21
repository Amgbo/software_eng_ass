// src/app/api/student/login/route.ts

import { NextResponse } from "next/server";
import pool  from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { student_id, password } = await req.json();

    // Check if student exists
    const result = await pool.query(
      "SELECT * FROM students WHERE student_id = $1",
      [student_id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const student = result.rows[0];

    // Compare password
    const passwordMatch = await bcrypt.compare(password, student.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    // Return student info (excluding password)
    const { password: _, ...studentData } = student;
    return NextResponse.json({ message: "Login successful", student: studentData });
  } catch (error) {
    console.error("Student Login Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
