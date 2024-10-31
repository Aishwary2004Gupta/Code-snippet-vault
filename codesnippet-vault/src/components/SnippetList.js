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
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Code Snippets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.map((snippet) => (
          <div 
            key={snippet.$id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 transition-transform transform hover:scale-105"
          >
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{snippet.title}</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {snippet.language}
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-2">Added by: {snippet.author}</div>
            </div>
            <div className="p-4">
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-gray-700">{snippet.code}</code>
              </pre>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">Upvotes: {snippet.upvotes}</span>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnippetList;