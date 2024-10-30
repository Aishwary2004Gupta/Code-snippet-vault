import React, { useState } from 'react';
import { databases } from '../appwrite/appwrite';

const SnippetForm = ({ user }) => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await databases.createDocument('6721d5ed003ce6169757', '6721d61500357caf9833', {
        title,
        code,
        language,
        userId: user.$id,
      });
      alert('Snippet added successfully');
    } catch (error) {
      console.error('Error adding snippet', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Code snippet" 
        value={code} 
        onChange={(e) => setCode(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Language" 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)} 
        required 
      />
      <button type="submit">Add Snippet</button>
    </form>
  );
};

export default SnippetForm;
