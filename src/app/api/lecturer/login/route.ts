

// src/app/api/lecturer/login/route.ts

import { NextResponse } from "next/server";
import  pool  from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { lecturer_id, password } = await req.json();

    const result = await pool.query(
      "SELECT * FROM lecturers WHERE lecturer_id = $1",
      [lecturer_id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Lecturer not found" },
        { status: 404 }
      );
    }

    const lecturer = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, lecturer.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const { password: _, ...lecturerData } = lecturer;

    return NextResponse.json({
      message: "Login successful",
      lecturer: lecturerData,
    });
  } catch (error) {
    console.error("Lecturer Login Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
