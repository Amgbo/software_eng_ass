'use client';

import Link from 'next/link';
import './dashboard.css';

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <div className="hero-overlay">
        <h1>🎓 Welcome to the Computer Engineering Portal</h1>
        <p>Your hub for course enrollment, fee tracking, and more.</p>
        <p className="quote">
  "pressure creates diamonds. Stay under it."
</p>

        <div className="portal-buttons">
          <Link href="/student/login">
            <button className="btn student-btn">Student Portal</button>
          </Link>
          <Link href="/lecturer/login">
            <button className="btn lecturer-btn">Lecturer Portal</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
