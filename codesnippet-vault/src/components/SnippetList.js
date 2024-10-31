import React, { useEffect, useState } from 'react';
import { databases } from '../appwrite/appwrite';
import { DATABASE_ID, COLLECTION_ID } from '../config';

const SnippetList = ({ user }) => {
  const [snippets, setSnippets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      if (!user) {
        setError('You need to be logged in to view snippets.');
        return;
      }
      
      try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        setSnippets(result.documents);
      } catch (error) {
        console.error('Error fetching snippets', error);
        setError('Error fetching snippets. Please try again.');
      }
    };
    
    fetchSnippets();
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Snippets</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {snippets.map((snippet) => (
          <li key={snippet.$id} className="border p-4 rounded">
            <h3 className="text-xl font-semibold">{snippet.title}</h3>
            <pre className="bg-gray-100 p-2 mt-2 rounded">{snippet.code}</pre>
            <p className="mt-2">Language: {snippet.language}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnippetList;