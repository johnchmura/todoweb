import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { auth, db } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDoc, doc, onSnapshot} from 'firebase/firestore';
import { useUserData } from '../lib/hooks';

function MyApp({ Component, pageProps }) {

  const {user, username} = useUserData();
  return (
    <>
    <UserContext.Provider value={{ user, username }}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
    </>
  );
}

export default MyApp;