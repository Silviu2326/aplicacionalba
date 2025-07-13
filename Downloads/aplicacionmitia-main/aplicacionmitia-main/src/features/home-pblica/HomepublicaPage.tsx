import React from 'react';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import { useHomepublica } from './hooks/useHomepublica';
import Header from '../../components/Header';
import InteractiveQuiz from './components/InteractiveQuiz';

const HomepublicaPage: React.FC = () => {
  const { testimonials, isLoading, error } = useHomepublica();

  return (
    <div>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Encuentra tu Terapeuta Ideal</h2>
            <InteractiveQuiz />
          </div>
        </section>
        <HowItWorksSection />
        <TestimonialsSection testimonials={testimonials} isLoading={isLoading} error={error} />
        {/* Other sections of the home page can be added here */}
      </main>
    </div>
  );
};

export default HomepublicaPage;
