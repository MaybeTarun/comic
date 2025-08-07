import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const HighScoreDisplay = () => {
  const [highScore, setHighScore] = useState<number | null>(null);

  useEffect(() => {
    const localHighScore = Number(localStorage.getItem("highScore") || 0);

    const fetchFirestoreHighScore = async (user: User) => {
      const userRef = doc(db, "leaderboard", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const firestoreScore = userSnap.data().score || 0;
        setHighScore(firestoreScore);
      } else {
        await setDoc(userRef, {
          name: user.displayName || user.email || "Anonymous",
          score: localHighScore,
        });
        setHighScore(localHighScore);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchFirestoreHighScore(user);
      } else {
        setHighScore(localHighScore);
      }
    });

    return () => unsubscribe();
  }, []);

  return <>{highScore !== null && `${highScore}`}</>;
};

export default HighScoreDisplay;
