import React, { useState } from 'react';
import { databases, query } from '../appwrite/appwrite'; // Import query from appwrite
import { DATABASE_ID, COLLECTION_ID } from '../config';

const SnippetForm = ({ user }) => {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState(''); // New state for snippet title to delete

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
      const documentData = {
        title: title,
        code: code,
        language: language,
        userId: user.$id,
        author: user.name || user.email || 'Anonymous',
        upvotes: 0
      };

      console.log('Submitting document:', documentData);
      
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        'unique()',
        documentData
      );

      console.log('Document created:', response);
      
      setTitle('');
      setCode('');
      setLanguage('');
      alert('Snippet added successfully!');
    } catch (error) {
      console.error('Detailed error:', error);
      setError(`Error adding snippet: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTitle) {
      setError('Please provide a valid snippet title.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch the snippet by title
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        query.equal('title', deleteTitle)
      ]);

      if (response.documents.length === 0) {
        setError('Snippet not found.');
        setLoading(false);
        return;
      }

      const snippet = response.documents[0];

      // Check if the current user is the owner
      if (snippet.userId !== user.$id) {
        setError('You are not authorized to delete this snippet.');
        setLoading(false);
        return;
      }

      // Delete the snippet
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, snippet.$id);
      console.log('Document deleted:', snippet.$id);
      alert('Snippet deleted successfully!');
      setDeleteTitle(''); // Clear the title after deletion
    } catch (error) {
      console.error('Detailed error:', error);
      setError(`Error deleting snippet: ${error.message}`);
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
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-2">Delete Snippet</h2>
        <input 
          type="text" 
          placeholder="Enter snippet title" 
          value={deleteTitle} 
          onChange={(e) => setDeleteTitle(e.target.value)} 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button 
          onClick={handleDelete} 
          disabled={loading}
          className={`w-full py-2 px-4 rounded font-medium ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {loading ? 'Deleting...' : 'Delete Snippet'}
        </button>
      </div>
    </div>
  );
};

export default SnippetForm;