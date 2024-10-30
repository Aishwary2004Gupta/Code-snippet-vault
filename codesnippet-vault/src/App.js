import React, { useEffect, useState } from 'react';
import { account } from './appwrite/appwrite';
import HomePage from './pages/HomePage';
import Login from './components/Login';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        console.error('User not logged in');
      }
    };
    getUser();
  }, []);

  const handleLogout = () => {
    setUser(null); // Reset user to null on logout
  };

  return (
    <div>
      {user ? <HomePage user={user} onLogout={handleLogout} /> : <Login />}
    </div>
  );
};

export default App;
