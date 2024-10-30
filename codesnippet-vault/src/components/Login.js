import React, { useEffect } from 'react';
import { account } from '../appwrite/appwrite';

const Login = () => {
  const handleLogin = async () => {
    try {
      await account.createOAuth2Session('github', 'http://localhost:3000');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h2>Login to CodeSnippet Vault</h2>
      <button onClick={handleLogin}>Login with GitHub</button>
    </div>
  );
};

export default Login;
