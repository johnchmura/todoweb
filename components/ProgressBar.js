import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import styles from '../styles/ProgressBar.module.css';

export default function ProgressBar() {
  const { user } = useContext(UserContext);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [cumulXP, setCumulXP] = useState(0);
  const [neededXP, setNeededXP] = useState(100); // Set your desired level-up XP here
  const [level, setLevel] = useState(1);
  const [currentXP, setCurrentXP] = useState(0);
  // Listen for changes in the user's XP in Firestore
  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        const userData = doc.data();
        if (userData) {
          const experiencePoints = userData.experiencePoints || 0;
          setCurrentXP(experiencePoints)
          // Check if the user has enough XP to level up
          if (experiencePoints >= neededXP) {
            setCumulXP(neededXP);
            setLevel( Math.floor(experiencePoints / 100) + 1);
            setNeededXP(neededXP * 2); 
          }
          // Calculate the progress percentage
          const percentage = ((experiencePoints - cumulXP) / (neededXP- cumulXP)) * 100;
          setProgressPercentage(percentage);
        }
      });

      return unsubscribe;
    }
  }, [user, neededXP]);

  return (
    <div>
      <div className={styles.progressBarCenterContainer}>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      <span className={styles.progressText}>
        {`Level ${(level)} (${currentXP} XP)`}
      </span>
    </div>
  );
}
