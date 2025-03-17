import React from 'react';

interface DatabaseUnderstandingProps {
  understanding: string;
}

const DatabaseUnderstanding: React.FC<DatabaseUnderstandingProps> = ({ understanding }) => {
  return (
    <div className="w-full">
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-semibold mb-2">Database Understanding</h3>
        <p className="text-sm">{understanding}</p>
      </div>
    </div>
  );
};

export default DatabaseUnderstanding;