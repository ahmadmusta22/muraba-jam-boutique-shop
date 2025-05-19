import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import ProductGrid from '../products/ProductGrid';
import { getProducts, Product } from '@/lib/firestore';
import { ArrowRight } from 'lucide-react';

const FeaturedProducts = () => {
  const { t, dir } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(products => {
      setProducts(products);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
            {t('home.featured')}
          </h2>
          <Link 
            to="/shop" 
            className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
          >
            {t('nav.shop')}
            <ArrowRight size={16} className={`ml-1 rtl-mirror ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
