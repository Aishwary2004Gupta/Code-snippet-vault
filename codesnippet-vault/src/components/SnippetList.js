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
      <div className="snippet-container">
        {snippets.map((snippet) => (
          <div key={snippet.$id} className="snippet-card">
            <div className="snippet-header">
              <h3 className="snippet-title">{snippet.title}</h3>
              <span className="snippet-language">{snippet.language}</span>
            </div>
            <div className="snippet-metadata">Added by: {snippet.author}</div>
            <pre>
              <code>{snippet.code}</code>
            </pre>
            <div className="snippet-footer">
              <span className="snippet-upvotes">Upvotes: {snippet.upvotes}</span>
              <button className="upvote-button">Upvote</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SnippetList;