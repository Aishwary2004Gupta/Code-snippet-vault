import React from 'react';
import SnippetForm from '../components/SnippetForm';
import SnippetList from '../components/SnippetList';
import { account } from '../appwrite/appwrite';

const HomePage = ({ user, onLogout }) => {
  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      onLogout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      <h1>Welcome to CodeSnippet Vault</h1>
      <button onClick={handleLogout}>Logout</button>
      <SnippetForm user={user} />
      <SnippetList user={user} />
    </div>
  );
};

export default HomePage;
