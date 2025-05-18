
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const { t, dir } = useLanguage();

  return (
    <section className="relative bg-muted py-20 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
            {t('home.hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            {t('home.hero.subtitle')}
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium transition-colors"
          >
            {t('home.hero.cta')}
            <ArrowRight size={18} className={`ml-2 rtl-mirror ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-muraba-300 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-300 to-transparent"></div>
    </section>
  );
};

export default Hero;
