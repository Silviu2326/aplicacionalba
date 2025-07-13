
import React, { useState } from 'react';

const FeedbackTagManager: React.FC = () => {
  const [tags, setTags] = useState(['bug', 'feature-request', 'positive', 'ui-issue']);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="bg-surface p-6 rounded-lg shadow-lg text-text">
      <h3 className="text-xl font-semibold mb-4">Manage Tags</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center bg-accent text-white px-3 py-1 rounded-full text-sm">
            <span>{tag}</span>
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 text-white hover:text-error"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="New tag..."
          className="bg-backgroundSecondary text-text border border-border rounded px-3 py-2 flex-grow"
        />
        <button
          onClick={handleAddTag}
          className="bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded"
        >
          Add Tag
        </button>
      </div>
    </div>
  );
};

export default FeedbackTagManager;
