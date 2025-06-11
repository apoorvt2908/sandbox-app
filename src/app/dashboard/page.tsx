'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/Authcontext';

export default function Dashboard() {
  const { user } = useAuth() ?? {};


  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container mt-5">
        <p className="text-center">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2>Welcome to Your Dashboard, {user.name} 👋</h2>
      <hr />
      <ul className="list-group mt-3">
      </ul>
    </div>
  );
}
