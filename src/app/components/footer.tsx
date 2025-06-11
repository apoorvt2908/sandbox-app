// components/Footer.tsx
export default function Footer() {
  return (
    <footer style={{ marginTop: '40px', padding: '1rem', backgroundColor: '#f5f5f5' }}>
      <p>&copy; {new Date().getFullYear()} My Simple Website</p>
    </footer>
  );
}
