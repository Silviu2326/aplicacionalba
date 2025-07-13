import React from 'react';
import { Button } from '@/components/Button';

const ReviewCard = ({ review, onApprove, onDelete }) => {
  if (!review) {
    return null;
  }

  const { id, author, professional, rating, text } = review;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm text-gray-600">
            <strong>Autor:</strong> {author}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Profesional:</strong> {professional}
          </p>
          <div className="flex items-center my-2">
            <p className="text-sm font-bold mr-2">Puntuación:</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-700 font-semibold">{rating}/5</span>
          </div>
          <p className="text-gray-800 mt-2">{text}</p>
        </div>
        <div className="flex flex-col space-y-2 ml-4">
          <Button
            onClick={() => onApprove(id)}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Aprobar
          </Button>
          <Button
            onClick={() => onDelete(id)}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
