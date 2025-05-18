
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import About from '@/components/home/About';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <About />
    </Layout>
  );
};

export default Index;
