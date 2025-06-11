'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/Authcontext';

interface User {
  name: string;
  email: string;
  password: string;
}



export default function Login() {
  const { user, login: loginUser, logout } = useAuth();

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check if token expired
  const checkTokenExpiry = () => {
    const tokenTime = localStorage.getItem('tokenTime');
    const token = localStorage.getItem('authToken');

    if (token && tokenTime) {
      const now = new Date().getTime();
      const expiryTime = parseInt(tokenTime) + 60 * 1000; 

      if (now > expiryTime) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenTime');
        localStorage.removeItem('loggedInUser');
        setIsLoggedIn(false);
        setLoginStatus('Session expired. Please login again.');
        router.push('/login'); 
        
      }
    }
  };

  // Run token check every second
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) setIsLoggedIn(true);

    const interval = setInterval(() => {
      checkTokenExpiry();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateToken = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUsers = localStorage.getItem('registeredUsers');
    if (!storedUsers) {
      setLoginStatus('No users found. Please register first.');
      return;
    }

    const users: User[] = JSON.parse(storedUsers);
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
  const token = generateToken();
  localStorage.setItem('authToken', token);
  localStorage.setItem('tokenTime', new Date().getTime().toString());

  localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
  loginUser(foundUser); // Update context here!
  router.push('/dashboard'); 
  setLoginStatus(`Welcome ${foundUser.name}!`);
} else {
  setLoginStatus('Invalid email or password.');
}

  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenTime');
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setLoginStatus(null);
          router.push('/login')

  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">{isLoggedIn ? 'Dashboard' : 'Login'}</h2>

      {isLoggedIn ? (
        <>
          <p>{loginStatus}</p>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder='Enter email address'
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder='Enter password'
            />
          </div>

          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      )}

      {loginStatus && <div className="alert alert-info mt-3">{loginStatus}</div>}
    </div>
  );
}
