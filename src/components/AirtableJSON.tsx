import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface AirtableJSONProps {
  json: string;
}

const AirtableJSON: React.FC<AirtableJSONProps> = ({ json }) => {
  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-semibold mb-2">Airtable API JSON</h3>
        <SyntaxHighlighter language="json" style={docco}>
          {json}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default AirtableJSON;