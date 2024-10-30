import React, { useState } from 'react';
import { databases } from '../appwrite/appwrite';
import { DATABASE_ID, COLLECTION_ID } from '../config';

const SnippetForm = ({ user }) => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validLanguages = ['JavaScript', 'Python', 'Java', 'C#', 'C++', 'Ruby', 'PHP', 'Go', 'Swift']; // Add more as needed

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validLanguages.includes(language)) {
      setError('Please select a valid programming language.');
      return;
    }
  
    setLoading(true);
    setError(null); // Reset error state
  
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        'unique()', // Use 'unique()' to auto-generate the document ID
        {
          title,
          code,
          language,
          userId: user.$id,
        }
      );
      alert('Snippet added successfully');
      setTitle(''); // Clear form fields
      setCode('');
      setLanguage('');
    } catch (error) {
      console.error('Error adding snippet', error);
      setError('Error adding snippet, please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Snippet'}
      </button>
    </form>
  );
};

export default SnippetForm;
