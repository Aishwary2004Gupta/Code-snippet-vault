import React, { useEffect, useState } from 'react';
import { databases } from '../appwrite/appwrite';

const SnippetList = () => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const result = await databases.listDocuments('6721d5ed003ce6169757', '6721d61500357caf9833');
        setSnippets(result.documents);
      } catch (error) {
        console.error('Error fetching snippets', error);
      }
    };
    fetchSnippets();
  }, []);

  return (
    <div>
      <h2>All Snippets</h2>
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
