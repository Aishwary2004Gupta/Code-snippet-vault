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
      // Create the document data object matching the collection schema exactly
      const documentData = {
        title: title,
        code: code,
        language: language,
        userId: user.$id,
        author: user.name || user.email || 'Anonymous', // Fallback to 'Anonymous' if name and email are not available
        upvotes: 0
      };

      console.log('Submitting document:', documentData); // Debug log
      
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        'unique()',
        documentData
      );

      console.log('Document created:', response); // Debug log
      
      setTitle('');
      setCode('');
      setLanguage('');
      alert('Snippet added successfully!');
    } catch (error) {
      console.error('Detailed error:', error); // Debug log
      setError(`Error adding snippet: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input 
            type="text" 
            placeholder="Enter snippet title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Code</label>
          <textarea 
            placeholder="Paste your code here" 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            required 
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 min-h-[200px] font-mono"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Language</label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)} 
            required
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Language</option>
            {validLanguages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-2 px-4 rounded font-medium ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {loading ? 'Adding...' : 'Add Snippet'}
        </button>
      </form>
    </div>
  );
};

export default SnippetForm;