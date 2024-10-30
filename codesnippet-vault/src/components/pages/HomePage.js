import React from 'react';
import SnippetForm from '../components/SnippetForm';
import SnippetList from '../components/SnippetList';

const HomePage = ({ user }) => {
  return (
    <div>
      <h1>Welcome to CodeSnippet Vault</h1>
      <SnippetForm user={user} />
      <SnippetList />
    </div>
  );
};

export default HomePage;
