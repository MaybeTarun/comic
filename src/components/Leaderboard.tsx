import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

type Player = {
  name: string;
  score: number;
};

const Leaderboard = () => {
  const { currentUser } = useAuth();
  const [players, setPlayers] = useState<Player[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Fetch leaderboard
  useEffect(() => {
    const fetchPlayers = async () => {
      const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data() as Player);
      setPlayers(data);
    };

    fetchPlayers();
  }, []);

  // Set default score if not set
  useEffect(() => {
    const setDefaultScore = async () => {
      if (!currentUser) return;
      const userDoc = doc(db, 'leaderboard', currentUser.uid);
      await setDoc(
        userDoc,
        {
          name: currentUser.displayName || name,
          score: 0,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );
    };

    setDefaultScore();
  }, [currentUser, name]);

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, 'leaderboard', user.uid), {
        name,
        score: 0,
        createdAt: serverTimestamp(),
      });

      setError('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleSignin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 p-4">
      {!currentUser ? (
        <div className="space-y-4 max-w-md w-full bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-center">Login or Sign Up</h2>
          <input
            placeholder="Name"
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
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
          <h2 className="text-3xl font-bold text-center mb-6">Leaderboard</h2>

          <div className="grid grid-cols-3 font-semibold border-b pb-2 mb-2 text-gray-700">
            <span>Rank</span>
            <span>Name</span>
            <span className="text-right">Score</span>
          </div>

          <div className="overflow-y-auto flex-grow space-y-2">
            {players.slice(0, 50).map((player, idx) => {
              let color = '';
              if (idx === 0) color = 'text-yellow-500 font-bold';
              else if (idx === 1) color = 'text-gray-500 font-bold';
              else if (idx === 2) color = 'text-orange-400 font-bold';

              return (
                <div
                  key={idx}
                  className={`grid grid-cols-3 items-center p-2 rounded ${
                    idx % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                  } ${color}`}
                >
                  <span>#{idx + 1}</span>
                  <span>{player.name}</span>
                  <span className="text-right">{player.score}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
