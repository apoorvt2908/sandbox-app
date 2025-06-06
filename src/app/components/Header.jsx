'use client';

import Link from 'next/link';



export default function Header() {
    return(
     <header className='bg-light'>

        <div className= 'd-flex justify-content-start gap-5 border p-2 bg-light'>
       <div>My Website</div>

       <nav className='d-flex gap-3'>
        <Link href = '/about'>About</Link>
        <Link href = '/'>Home</Link>
        <Link href = '/contact'>Contact</Link>
        <Link href = '/blog'>Blog</Link>
       </nav>

        </div>
      

     </header>   
    )
}
