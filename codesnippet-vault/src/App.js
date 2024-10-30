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

  return (
    <div>
      {user ? <HomePage user={user} /> : <Login />}
    </div>
  );
};

export default App;
