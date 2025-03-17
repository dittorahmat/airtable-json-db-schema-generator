import React, { useState } from 'react';

interface InputAreaProps {
  onInputChange: (text: string) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ onInputChange }) => {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    onInputChange(event.target.value);
  };

  return (
    <div className="w-full">
      <textarea
        className="w-full h-40 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter client description..."
        value={text}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputArea;