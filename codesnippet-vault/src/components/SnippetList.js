import React, { useEffect, useState } from 'react';
import { databases } from './appwrite';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const SnippetList = () => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      const result = await databases.listDocuments('codeSnippets', 'snippets');
      setSnippets(result.documents);
    };
    fetchSnippets();
  }, []);

  return (
    <div>
      {snippets.map((snippet) => (
        <div key={snippet.$id}>
          <h2>{snippet.title}</h2>
          <pre>
            <code className={`language-${snippet.language}`} dangerouslySetInnerHTML={{ __html: hljs.highlight(snippet.language, snippet.code).value }} />
          </pre>
          <button>Upvote</button>
        </div>
      ))}
    </div>
  );
};

export default SnippetList;
