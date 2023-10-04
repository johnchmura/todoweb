import { auth, db } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDoc, doc, onSnapshot} from 'firebase/firestore';

export function useUserData() {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
  
    useEffect(() => {
      let unsubscribe;
  
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        unsubscribe = onSnapshot(userRef, (docSnapshot) => {
          setUsername(docSnapshot.data()?.username);
        });
      } else {
        setUsername(null);
      }
  
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }, [user]);
  
    return { user, username };
  }
  
  
  
  
  
  