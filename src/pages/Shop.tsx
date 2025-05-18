
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import CategoryFilter from '@/components/products/CategoryFilter';
import ProductGrid from '@/components/products/ProductGrid';
import { getProductsByCategory } from '@/data/products';

const Shop = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [products, setProducts] = useState(getProductsByCategory(selectedCategory));

  useEffect(() => {
    setProducts(getProductsByCategory(selectedCategory));
    setSearchParams({ category: selectedCategory });
  }, [selectedCategory, setSearchParams]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-8">
          {t('nav.shop')}
        </h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <CategoryFilter selected={selectedCategory} onChange={handleCategoryChange} />
          </div>
          
          {/* Products */}
          <div className="flex-grow">
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
