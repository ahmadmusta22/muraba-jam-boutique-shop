import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { getProductCategories } from '@/lib/firestore';

const Categories = () => {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Define category images (in a real app, these would be proper images)
  const categoryImages: Record<string, string> = {
    'fruit-based': '/placeholder.svg',
    'sugar-free': '/placeholder.svg',
    'organic': '/placeholder.svg',
    'premium': '/placeholder.svg',
  };

  useEffect(() => {
    getProductCategories().then(cats => {
      setCategories(cats.filter(cat => cat !== 'all'));
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-16 bg-muted">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-12">
          {t('home.categories')}
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg h-40"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(categoryId => (
              <Link
                key={categoryId}
                to={`/shop?category=${categoryId}`}
                className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative pt-[70%] overflow-hidden">
                  <img
                    src={categoryImages[categoryId] || '/placeholder.svg'}
                    alt={categoryId}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <h3 className="text-white font-medium text-xl p-6">
                      {t(`category.${categoryId}`) !== `category.${categoryId}`
                        ? t(`category.${categoryId}`)
                        : categoryId}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
