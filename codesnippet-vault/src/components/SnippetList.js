import React, { useEffect, useState } from 'react';
import { databases } from '../appwrite/appwrite';
import { DATABASE_ID, COLLECTION_ID } from '../config';

const SnippetList = ({ user }) => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID
        );
        setSnippets(response.documents);
      } catch (error) {
        console.error('Error fetching snippets:', error);
        setError('Failed to load snippets. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2">Loading snippets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded mt-4">
        {error}
      </div>
    );
  }

  if (snippets.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No snippets found. Be the first to add one!
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Code Snippets</h2>
      <div className="space-y-4">
        {snippets.map((snippet) => (
          <div 
            key={snippet.$id} 
            className="bg-white shadow rounded-lg overflow-hidden border border-gray-200"
          >
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{snippet.title}</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {snippet.language}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Added by: {snippet.author || 'Anonymous'}
              </div>
            </div>
            <div className="p-4">
              <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
                <code>{snippet.code}</code>
              </pre>
            </div>
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Upvotes: {snippet.upvotes || 0}
              </span>
              <button 
                onClick={() => {/* Add upvote functionality here */}} 
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Upvote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnippetList;