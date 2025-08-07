import { useEffect, useState, useCallback } from 'react';
import { db, auth } from '../firebase';
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  where,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

type Player = {
  name: string;
  score: number;
  email: string;
};

const Leaderboard = () => {
  const { currentUser } = useAuth();
  const [players, setPlayers] = useState<Player[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [userScore, setUserScore] = useState<number | null>(null);
  const [userRank, setUserRank] = useState<number | null>(null);

  const fetchPlayers = useCallback(async () => {
    const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => doc.data() as Player);
    setPlayers(data);

    if (currentUser) {
      const current = data.find(player => player.email === currentUser.email);
      if (current) setUserScore(current.score);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  useEffect(() => {
    if (currentUser && currentUser.email) {
      const index = players.findIndex((p) => p.email === currentUser.email);
      if (index !== -1) {
        setUserScore(players[index].score);
        setUserRank(index + 1);
      }
    }
  }, [players, currentUser]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const isNameTaken = async (username: string) => {
    const snapshot = await getDocs(collection(db, 'leaderboard'));
    return snapshot.docs.some(doc => doc.data().name === username);
  };

  const isEmailTaken = async (email: string) => {
    const snapshot = await getDocs(
      query(collection(db, 'leaderboard'), where('email', '==', email))
    );
    return !snapshot.empty;
  };

  const handleSignup = async () => {
    try {
      if (!name || !email || !password) {
        setError('All fields are required');
        return;
      }

      const usernameTaken = await isNameTaken(name);
      if (usernameTaken) {
        setError('Username already taken');
        return;
      }

      const emailTaken = await isEmailTaken(email);
      if (emailTaken) {
        setError('An account with this email already exists');
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);

      await addDoc(collection(db, 'leaderboard'), {
        name,
        score: 0,
        email,
      });

      setError('');
      await fetchPlayers();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleSignin = async () => {
    try {
      if (!email || !password) {
        setError('Email and password are required');
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      await fetchPlayers();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-white p-4">
      {!currentUser ? (
        <div className="space-y-4 max-w-md w-full bg-gray-100 p-6">
          <h2 className="text-xl font-semibold text-center">Login or Sign Up</h2>
          <input
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-between">
            <button
              onClick={handleSignup}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Sign Up
            </button>
            <button
              onClick={handleSignin}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Sign In
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-3xl h-full bg-gray-100 p-6 flex flex-col">
            <div className="grid grid-cols-3 font-semibold border-b pb-2 mb-2 text-gray-700 sticky top-0 bg-gray-100 z-10 text-sm md:text-base">
              <span>Rank</span>
              <span>Name</span>
              <span className="text-right">Score</span>
            </div>
  
            {userScore !== null && (
              <div className="text-center mb-2 text-blue-600 font-semibold sticky top-10 bg-gray-100 z-10 text-sm md:text-base">
                Your Rank is #{userRank} with a score of {userScore}
              </div>
            )}
  
            <div className="overflow-y-scroll flex-grow space-y-2" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              {players.slice(0, 50).map((player, idx) => {
                let bg = '';
                if (idx === 0) bg = 'bg-yellow-300 font-bold';
                else if (idx === 1) bg = 'bg-gray-400 font-bold';
                else if (idx === 2) bg = 'bg-orange-300 font-bold';
                else bg = idx % 2 === 0 ? 'bg-gray-300' : 'bg-gray-200';
  
                return (
                  <div
                    key={idx}
                    className={`grid grid-cols-3 items-center p-2 rounded ${bg} text-sm md:text-base`}
                  >
                    <span>#{idx + 1}</span>
                    <span>{player.name}</span>
                    <span className="text-right">{player.score}</span>
                  </div>
                );
              })}
            </div>
            <button
              onClick={handleLogout}
              className="absolute bottom-3 right-3 bg-red-600 text-white px-3 md:px-4 py-1 md:py-2 rounded text-sm md:text-base hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );  
};

export default Leaderboard;
