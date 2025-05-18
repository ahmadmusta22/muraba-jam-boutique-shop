
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden">
            <img 
              src="/placeholder.svg" 
              alt="About Muraba"
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6">
              {t('home.about.title')}
            </h2>
            
            <p className="text-muted-foreground mb-4">
              {t('home.about.text')}
            </p>
            
            <p className="text-muted-foreground mb-6">
              Our mission is to preserve traditional Tunisian jam-making methods while bringing these delicious flavors to homes across the country. Every jar is carefully crafted in small batches to ensure quality and taste.
            </p>
            
            <Link 
              to="/about"
              className="inline-block bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-md font-medium transition-colors"
            >
              {t('nav.about')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
