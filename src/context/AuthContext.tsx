import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  userHighScore: number;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserHighScore: (score: number) => Promise<void>;
  getTopScores: () => Promise<Array<{ name: string; score: number; isCurrentUser?: boolean; uid?: string }>>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  userHighScore: 0,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  updateUserHighScore: async () => {},
  getTopScores: async () => []
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userHighScore, setUserHighScore] = useState(0);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string, username: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: username });
    
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      username: username,
      email: email,
      highScore: 0,
      createdAt: new Date()
    });
  };

  const logout = async () => {
    await signOut(auth);
    setUserHighScore(0);
  };

  const updateUserHighScore = async (score: number) => {
    if (!currentUser) return;

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const currentHighScore = userDoc.data().highScore || 0;
        if (score > currentHighScore) {
          await updateDoc(userDocRef, { 
            highScore: score,
            lastUpdated: new Date()
          });
          setUserHighScore(score);
          localStorage.setItem("shooterHighScore", score.toString());
        }
      }
    } catch (error) {
      console.error('Error updating high score:', error);
    }
  };

  const getTopScores = async (): Promise<Array<{ name: string; score: number; isCurrentUser?: boolean; uid?: string }>> => {
    try {
      const q = query(
        collection(db, 'users'),
        orderBy('highScore', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      
      const realScores = querySnapshot.docs
        .map(doc => ({
          name: doc.data().username || 'Anonymous',
          score: doc.data().highScore || 0,
          uid: doc.id,
          isCurrentUser: currentUser ? doc.id === currentUser.uid : false
        }))
        .filter(player => player.score > 0);

      const sampleScores = [
        { name: "AceHunter", score: 47, isCurrentUser: false },
        { name: "ShadowFox", score: 39, isCurrentUser: false },
        { name: "BladeStorm", score: 40, isCurrentUser: false },
        { name: "NightWolf", score: 35, isCurrentUser: false },
        { name: "CrimsonViper", score: 21, isCurrentUser: false },
        { name: "IronFist", score: 10, isCurrentUser: false },
        { name: "PhantomStrike", score: 2, isCurrentUser: false },
        { name: "FrostBite", score: 69, isCurrentUser: false },
        { name: "Turun", score: 122, isCurrentUser: false },
        { name: "RogueSniper", score: 79, isCurrentUser: false },
        { name: "SilentBlade", score: 46, isCurrentUser: false },
        { name: "SteelHeart", score: 23, isCurrentUser: false },
        { name: "DarkRider", score: 22, isCurrentUser: false },
        { name: "ThunderFang", score: 56, isCurrentUser: false },
        { name: "GhostReaper", score: 40, isCurrentUser: false },
      ];

      const allScores = [...realScores, ...sampleScores];
      
      const uniqueScores = allScores.reduce((acc, current) => {
        const existingIndex = acc.findIndex(item => item.name === current.name);
        if (existingIndex === -1) {
          acc.push(current);
        } else if (current.isCurrentUser || (!acc[existingIndex].isCurrentUser && current.score > acc[existingIndex].score)) {
          acc[existingIndex] = current;
        }
        return acc;
      }, [] as Array<{ name: string; score: number; isCurrentUser?: boolean; uid?: string }>);

      return uniqueScores.sort((a, b) => b.score - a.score);
    } catch (error) {
      console.error('Error fetching top scores:', error);
      return [];
    }
  };

  const syncScoreWithFirestore = async (user: User) => {
    try {
      const localHighScore = localStorage.getItem("shooterHighScore");
      const localScore = localHighScore ? Number(localHighScore) : 0;
      
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const firestoreScore = userDoc.data().highScore || 0;
        const maxScore = Math.max(localScore, firestoreScore);
        
        localStorage.setItem("shooterHighScore", maxScore.toString());
        if (maxScore > firestoreScore) {
          await updateDoc(userDocRef, { 
            highScore: maxScore,
            lastUpdated: new Date()
          });
        }
        setUserHighScore(maxScore);
      } else {
        await setDoc(userDocRef, {
          username: user.displayName || 'Anonymous',
          email: user.email || '',
          highScore: localScore,
          createdAt: new Date(),
          lastUpdated: new Date()
        });
        setUserHighScore(localScore);
      }
    } catch (error) {
      console.error('Error syncing score:', error);
      const localHighScore = localStorage.getItem("shooterHighScore");
      if (localHighScore) {
        setUserHighScore(Number(localHighScore));
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await syncScoreWithFirestore(user);
      } else {
        const localHighScore = localStorage.getItem("shooterHighScore");
        if (localHighScore) {
          setUserHighScore(Number(localHighScore));
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    userHighScore,
    login,
    signup,
    logout,
    updateUserHighScore,
    getTopScores
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);