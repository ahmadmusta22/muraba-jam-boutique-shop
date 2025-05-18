
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';

const About = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-5xl mx-auto">
          {/* Page title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-semibold mb-4">{t('nav.about')}</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the story behind Tunisia's premium jam manufacturer
            </p>
          </div>
          
          {/* Our story section */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-serif font-semibold mb-4">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded in 2015 in the heart of Tunisia, Muraba started as a small family operation with a passion for preserving traditional jam-making techniques while adding a modern twist.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our founder, Leila Benali, learned the art of jam-making from her grandmother, who used recipes passed down through generations. After studying culinary arts in Paris, Leila returned to Tunisia with a vision to share these delicious flavors with the world.
                </p>
                <p className="text-muted-foreground">
                  Today, Muraba has grown into a beloved national brand, but we still make our jams in small batches using locally sourced fruits and traditional methods to ensure the highest quality and taste.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/f79e4c9f-b907-4a8a-9304-eb510866f0a9.png" 
                  alt="Our Signature Strawberry Jam"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </section>

          <Separator className="my-16" />
          
          {/* Our values section */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-semibold mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Quality</h3>
                <p className="text-muted-foreground">
                  We source only the finest fruits from local Tunisian farmers and use traditional cooking methods to create jams of exceptional quality.
                </p>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  We're committed to sustainable practices, from supporting local agriculture to using eco-friendly packaging and minimizing waste.
                </p>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  While honoring tradition, we continuously explore new flavors and combinations to create unique products that delight our customers.
                </p>
              </div>
            </div>
          </section>
          
          <Separator className="my-16" />

          {/* Our process section */}
          <section className="mb-16">
            <h2 className="text-2xl font-serif font-semibold mb-8 text-center">Our Process</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/f79e4c9f-b907-4a8a-9304-eb510866f0a9.png" 
                  alt="Our jam-making process"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-2">1. Selection</h3>
                  <p className="text-muted-foreground">
                    We carefully select the freshest fruits from trusted local farms at the peak of their season.
                  </p>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-2">2. Preparation</h3>
                  <p className="text-muted-foreground">
                    Each fruit is hand-washed and inspected before being prepared according to our traditional recipes.
                  </p>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-2">3. Cooking</h3>
                  <p className="text-muted-foreground">
                    Our jams are cooked in small batches using copper pans to ensure perfect consistency and flavor development.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">4. Packaging</h3>
                  <p className="text-muted-foreground">
                    Each jar is filled by hand and carefully sealed to preserve freshness and quality.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
