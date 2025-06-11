'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './Authcontext';

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <header className="bg-light p-3 border shadow">
      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link href="/" style={{ fontWeight: pathname === '/' ? 'bold' : 'normal' }}>Home</Link>
        <Link href="/about" style={{ fontWeight: pathname === '/about' ? 'bold' : 'normal' }}>About</Link>
        <Link href="/contact" style={{ fontWeight: pathname === '/contact' ? 'bold' : 'normal' }}>Contact</Link>

        {!user && (
          <Link href="/registration" style={{ fontWeight: pathname === '/registration' ? 'bold' : 'normal' }}>
            Registration
          </Link>
        )}

        <Link href="/products" style={{ fontWeight: pathname === '/users' ? 'bold' : 'normal' }}>Products</Link>

        {user ? (
          <>
            <span className="text-success fw-bold">Welcome, {user.name}</span>
            <button className='btn btn-danger'onClick={logout} 
            >Logout</button>
          </>
        ) : (
          <Link href="/login" style={{ fontWeight: pathname === '/login' ? 'bold' : 'normal' }}>Login</Link>
        )}
      </nav>
    </header>
  );
}
