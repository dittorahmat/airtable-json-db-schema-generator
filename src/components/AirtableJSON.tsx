import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface AirtableJSONProps {
  json: string;
}

const AirtableJSON: React.FC<AirtableJSONProps> = ({ json }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-semibold mb-2 flex justify-between items-center">
          Airtable API JSON
          <button
            onClick={handleCopyClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
            disabled={copied}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </h3>
        <div className="relative">
          <SyntaxHighlighter language="json" style={docco} PreTag="div" codeTagProps={{ className: 'rounded-md overflow-hidden' }}>
            {json}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default AirtableJSON;