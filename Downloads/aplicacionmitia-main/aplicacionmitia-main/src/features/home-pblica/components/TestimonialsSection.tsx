
import React from 'react';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  avatar: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  isLoading: boolean;
  error: Error | null;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="text-center">
        <p className="text-textMuted">Loading testimonials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-error">
        <p>Error loading testimonials. Please try again later.</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-backgroundSecondary">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-text">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-surface p-6 rounded-lg shadow-md">
              <p className="text-textSecondary mb-4 text-sm md:text-base">"{testimonial.text}"</p>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-bold text-base md:text-lg text-text">{testimonial.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
