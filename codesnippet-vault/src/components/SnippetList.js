import React, { useEffect, useState } from 'react';
import { databases, account } from '../appwrite/appwrite';
import { DATABASE_ID, COLLECTION_ID } from '../config';

const SnippetList = () => {
  const [snippets, setSnippets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        // Check if the user is authenticated
        const user = await account.get();
        if (!user) {
          setError('User is not authenticated');
          return;
        }

        // Fetch documents from Appwrite if user is authenticated
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        setSnippets(result.documents);
      } catch (error) {
        console.error('Error fetching snippets', error);
        setError('You need to be logged in to view the snippets.');
      }
    };
    fetchSnippets();
  }, []);

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
