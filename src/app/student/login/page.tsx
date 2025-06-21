'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function StudentLogin() {
  const [student_id, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/student/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id, password }),
    });

    const result = await res.json();

    if (res.ok) {
      alert('Login successful!');
      console.log(result.student);
    } else {
      alert('Error: ' + result.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>🎓 Student Login</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Student ID"
            value={student_id}
            onChange={(e) => setStudentId(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.redirectText}>
          Don’t have an account? <Link href="/student/register" style={styles.link}>Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #dbeafe, #f0f4ff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  },
  formBox: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '14px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '420px',
  },
  heading: {
    marginBottom: '24px',
    textAlign: 'center',
    color: '#1e3a8a',
    fontSize: '24px',
    fontWeight: 700,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '15px',
    backgroundColor: '#f8fafc',
    transition: 'border 0.2s ease',
  },
  button: {
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s ease',
  },
  redirectText: {
    marginTop: '18px',
    textAlign: 'center',
    fontSize: '14px',
    color: '#475569',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginLeft: '4px',
  },
};
