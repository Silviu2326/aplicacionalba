import React from 'react';
import { FaFilePdf, FaFileWord, FaFileImage, FaFileAlt } from 'react-icons/fa';

// Define a type for the document props
interface Document {
  id: string;
  name: string;
  sharedAt: string; // Using string for date simplicity, can be Date object
  type: 'pdf' | 'word' | 'image' | 'other';
  url: string;
}

interface DocumentListItemProps {
  document: Document;
}

const getFileIcon = (type: Document['type']) => {
  switch (type) {
    case 'pdf':
      return <FaFilePdf className="text-error text-2xl" />;
    case 'word':
      return <FaFileWord className="text-primary text-2xl" />;
    case 'image':
      return <FaFileImage className="text-accent text-2xl" />;
    default:
      return <FaFileAlt className="text-textMuted text-2xl" />;
  }
};

const DocumentListItem: React.FC<DocumentListItemProps> = ({ document }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-borderLight last:border-b-0 transition-colors duration-200 hover:bg-backgroundSecondary">
      <div className="flex items-center space-x-4">
        {getFileIcon(document.type)}
        <div>
          <p className="font-semibold text-text">{document.name}</p>
          <p className="text-sm text-textSecondary">
            Compartido el: {new Date(document.sharedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <a
        href={document.url}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="bg-primary hover:bg-primaryHover text-textInverse font-bold py-2 px-4 rounded transition-colors duration-300"
      >
        Descargar
      </a>
    </div>
  );
};

export default DocumentListItem;
