import React from 'react';
import { account } from './appwrite';

const Login = () => {
  const loginWithGithub = () => {
    account.createOAuth2Session('github');
  };

  return (
    <button onClick={loginWithGithub}>Login with GitHub</button>
  );
};

export default Login;
