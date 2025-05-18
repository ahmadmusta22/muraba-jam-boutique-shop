
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import ProductGrid from '../products/ProductGrid';
import { products } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const FeaturedProducts = () => {
  const { t, dir } = useLanguage();
  
  // Get 4 featured products (in a real app, you might have a "featured" flag)
  const featuredProducts = products.slice(0, 4);

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
        
        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
