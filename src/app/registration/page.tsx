'use client';
import { useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const [user, setUser] = useState<User>({ name: '', email: '', password: '' });
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('registeredUsers');
    if (stored) {
      setUsers(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedUsers = [...users, user];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    setUser({ name: '', email: '', password: '' });
    alert('User registered successfully!');

  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">User Registration</h2>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder='Enter your full name'
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder='Enter a valid email'
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder='Enter a strong password'
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>

      <h4>Registered Users</h4>
      {users.length === 0 ? (
        <p>No users registered yet.</p>
      ) : (
        <ul className="list-group">
          {users.map((u, i) => (
            <li key={i} className="list-group-item">
              <strong>{u.name}</strong> - {u.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
