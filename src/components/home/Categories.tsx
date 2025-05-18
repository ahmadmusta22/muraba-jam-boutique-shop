
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const Categories = () => {
  const { t } = useLanguage();

  // Define category images (in a real app, these would be proper images)
  const categoryImages = {
    'fruit-based': '/placeholder.svg',
    'sugar-free': '/placeholder.svg',
    'organic': '/placeholder.svg',
    'premium': '/placeholder.svg',
  };

  // Filter out the "all" category
  const displayCategories = categories.filter(cat => cat.id !== 'all');

  return (
    <section className="py-16 bg-muted">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-12">
          {t('home.categories')}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCategories.map(category => (
            <Link 
              key={category.id}
              to={`/shop?category=${category.id}`} 
              className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative pt-[70%] overflow-hidden">
                <img 
                  src={categoryImages[category.id as keyof typeof categoryImages] || '/placeholder.svg'} 
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <h3 className="text-white font-medium text-xl p-6">
                    {t(`category.${category.id}`) !== `category.${category.id}` 
                      ? t(`category.${category.id}`) 
                      : category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
