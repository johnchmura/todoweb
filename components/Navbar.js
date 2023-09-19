import React from 'react';
import styles from '@/styles/Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><a href="/" className={styles.navLink}>Home</a></li> 
        <li><a href="/signin" className={styles.navLink}>Sign in</a></li> 
      </ul>
    </nav>
  );
}

export default Navbar;