import React, { useState } from 'react';
import { databases } from '../appwrite/appwrite';
import { DATABASE_ID, COLLECTION_ID } from '../config';

const SnippetForm = ({ user }) => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validLanguages = ['JavaScript', 'Python', 'Java', 'C#', 'C++', 'Ruby', 'PHP', 'Go', 'Swift'];

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validLanguages.includes(language)) {
      setError('Please select a valid programming language.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        'unique()',
        {
          title,
          code,
          language,
          userId: user.$id,
        }
      );
      alert('Snippet added successfully');
      setTitle('');
      setCode('');
      setLanguage('');
    } catch (error) {
      console.error('Error adding snippet:', error);
      setError('Error adding snippet, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
        className="w-full p-2 border rounded"
      />
      <textarea 
        placeholder="Code snippet" 
        value={code} 
        onChange={(e) => setCode(e.target.value)} 
        required 
        className="w-full p-2 border rounded"
      />
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)} 
        required
        className="w-full p-2 border rounded"
      >
        <option value="">Select Language</option>
        {validLanguages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
      >
        {loading ? 'Adding...' : 'Add Snippet'}
      </button>
    </form>
  );
};

export default SnippetForm;