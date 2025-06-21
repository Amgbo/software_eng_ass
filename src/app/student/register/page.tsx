'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function StudentRegister() {
  const [formData, setFormData] = useState({
    student_id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    date_of_birth: '',
    gender: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/student/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (res.ok) {
      alert('Student registered successfully!');
    } else {
      alert('Error: ' + result.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Student Registration</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <input name="first_name" placeholder="First Name" style={styles.input} onChange={handleChange} required />
            <input name="last_name" placeholder="Last Name" style={styles.input} onChange={handleChange} required />
          </div>
          <div style={styles.row}>
            <input name="student_id" placeholder="Student ID" style={styles.input} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" style={styles.input} onChange={handleChange} required />
          </div>
          <div style={styles.row}>
            <input name="password" type="password" placeholder="Password" style={styles.input} onChange={handleChange} required />
            <input name="phone" type="text" placeholder="Phone" style={styles.input} onChange={handleChange} />
          </div>
          <div style={styles.row}>
            <input name="address" placeholder="Address" style={styles.input} onChange={handleChange} />
            <input name="date_of_birth" type="date" placeholder="Date of Birth" style={styles.input} onChange={handleChange} />
          </div>
          <select name="gender" style={styles.fullInput} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <button type="submit" style={styles.button}>Register</button>
        </form>
        <p style={styles.redirectText}>
          Already registered? <Link href="/student/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to right,rgb(119, 164, 203),rgb(41, 107, 172))',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  },
  formBox: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '650px',
  },
  heading: {
    marginBottom: '24px',
    textAlign: 'center',
    fontSize: '26px',
    color: '#2c3e50',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  row: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    padding: '12px',
    fontSize: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  fullInput: {
    padding: '12px',
    fontSize: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    marginTop: '10px',
    padding: '14px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  redirectText: {
    marginTop: '18px',
    textAlign: 'center',
    fontSize: '14px',
  },
  link: {
    color: '#0070f3',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
};
