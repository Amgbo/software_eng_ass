'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function LecturerLogin() {
  const [lecturer_id, setLecturerId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/lecturer/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lecturer_id, password }),
    });

    const result = await res.json();
    if (res.ok) {
      alert('Login successful!');
      // You can redirect or store lecturer info here
      console.log(result.lecturer);
    } else {
      alert('Error: ' + result.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Lecturer Login</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Lecturer ID"
            style={styles.input}
            required
            value={lecturer_id}
            onChange={(e) => setLecturerId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.redirectText}>
          Don’t have an account? <Link href="/lecturer/register" style={styles.link}>Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  formBox: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '420px',
    border: '1px solid rgba(255,255,255,0.15)',
  },
  heading: {
    marginBottom: '24px',
    textAlign: 'center' as const,
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  input: {
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
    backgroundColor: '#f9f9f9',
    transition: 'all 0.3s ease',
  },
  button: {
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#00bcd4',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.3s ease',
  },
  redirectText: {
    marginTop: '20px',
    textAlign: 'center' as const,
    fontSize: '14px',
    color: '#eee',
  },
  link: {
    color: '#00bcd4',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};
