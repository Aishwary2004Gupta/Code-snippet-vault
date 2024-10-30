import React, { useEffect, useState } from 'react';
import { databases } from '../appwrite/appwrite';
import { DATABASE_ID, COLLECTION_ID } from '../config';

const SnippetList = ({ user }) => {
  const [snippets, setSnippets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      if (!user) {
        setError('You need to be logged in to view the snippets.');
        return;
      }

      try {
        // Fetch documents if user is authenticated
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
      <h2>All Snippets</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {snippets.map((snippet) => (
          <li key={snippet.$id}>
            <h3>{snippet.title}</h3>
            <pre>{snippet.code}</pre>
            <p>Language: {snippet.language}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnippetList;
