'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function LecturerRegister() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    lecturer_id: '',
    email: '',
    password: '',
    department: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/lecturer/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (res.ok) {
      alert('Lecturer registered successfully!');
    } else {
      alert('Error: ' + result.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Lecturer Registration</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <input name="first_name" placeholder="First Name" required onChange={handleChange} style={styles.input} />
            <input name="last_name" placeholder="Last Name" required onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.row}>
            <input name="lecturer_id" placeholder="Lecturer ID" required onChange={handleChange} style={styles.input} />
            <input name="email" type="email" placeholder="Email" required onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.row}>
            <input name="password" type="password" placeholder="Password" required onChange={handleChange} style={styles.input} />
            <input name="department" placeholder="Department" onChange={handleChange} style={styles.input} />
          </div>
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.redirectText}>
          Already registered? <Link href="/lecturer/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to right,rgb(104, 138, 180),rgb(33, 59, 95))',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
  },
  formBox: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  row: {
    display: 'flex',
    gap: '15px',
  },
  input: {
    flex: 1,
    padding: '12px',
    fontSize: '15px',
    border: '1px solid #ccc',
    borderRadius: '6px',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    fontWeight: 600,
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  redirectText: {
    marginTop: '15px',
    textAlign: 'center',
    fontSize: '14px',
  },
  link: {
    color: '#0070f3',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
};
