import React, { useState } from 'react';
import { databases } from './appwrite';

const SnippetForm = () => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');

  const submitSnippet = async () => {
    try {
      await databases.createDocument('codeSnippets', 'snippets', {
        title, code, language, upvotes: 0, author: 'USER_ID'
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code"></textarea>
      <input value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="Language" />
      <button onClick={submitSnippet}>Submit</button>
    </div>
  );
};

export default SnippetForm;
