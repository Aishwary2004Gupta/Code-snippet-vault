import React, { useEffect, useState } from 'react';
import { databases } from '../appwrite/appwrite';

const SnippetList = ({ user, onLogout }) => {
  const [snippets, setSnippets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      if (!user) {
        setError('You need to be logged in to view snippets.');
        return;
      }
      
      try {
        const result = await databases.listDocuments('6721d5ed003ce6169757', '6721d61500357caf9833');
        setSnippets(result.documents);
      } catch (error) {
        console.error('Error fetching snippets', error);
        setError('Error fetching snippets. Please try again.');

        // Log the user out if there's an authorization error (e.g., session expired)
        if (error.code === 401) {
          onLogout();
        }
      }
    };
    
    fetchSnippets();
  }, [user, onLogout]);

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
