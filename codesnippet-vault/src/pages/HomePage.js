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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome to CodeSnippet Vault</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <SnippetForm user={user} />
      <SnippetList user={user} />
    </div>
  );
};

export default HomePage;