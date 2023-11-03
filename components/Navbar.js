import Link from 'next/link';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { UserContext } from '../lib/context';



export default function Navbar() {

  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/" legacyBehavior>
            <button className="btn-logo">TodoWeb</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className="push-left">
            </li>
            <Link href ="/calendar" legacyBehavior>
              <button className='btn-calendar'>
              <img src="/calendar.png" />
              </button>
            </Link>
            <Link href ="/enter" legacyBehavior>
              <button className="btn-grey" onClick={() => signOut(auth)}>Sign Out</button>
            </Link>
            <img src={user?.photoURL} />
          </>
        )}
        {/* user is not signed OR has not created username */}
        
        
        {!username && (
          <>
          <li className='push-left'>
          </li>
          <Link href ="/calendar" legacyBehavior>
              <button className='btn-calendar'>
              <img src="/calendar.png" />
              </button>
            </Link>
            <Link href="/enter" legacyBehavior>
              <button className="btn-blue">Log in</button>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}