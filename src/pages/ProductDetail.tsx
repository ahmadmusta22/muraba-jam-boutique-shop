
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { getProductById, products } from '@/data/products';
import { Minus, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGrid from '@/components/products/ProductGrid';
import { LocalizedProduct } from '@/data/products';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, dir, language } = useLanguage();
  const { addItem } = useCart();
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      
      if (foundProduct) {
        // Find related products from same category, excluding current product
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);

  const handleQuantityChange = (amount: number) => {
    const newQuantity = Math.max(1, Math.min(quantity + amount, product?.stock || 1));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast.success(`${quantity} × ${getLocalizedText('name')} ${t('product.addedToCart')}`);
    }
  };

  // Function to get localized text
  const getLocalizedText = (field: 'name' | 'category' | 'description' | 'ingredients') => {
    if (!product) return '';
    
    const localizedProduct = product as LocalizedProduct;
    
    if (field === 'name' && localizedProduct.nameTranslations) {
      return localizedProduct.nameTranslations[language] || product.name;
    }
    
    if (field === 'category' && localizedProduct.categoryTranslations) {
      return localizedProduct.categoryTranslations[language] || product.category;
    }
    
    if (field === 'description' && localizedProduct.descriptionTranslations) {
      return localizedProduct.descriptionTranslations[language] || product.description;
    }
    
    if (field === 'ingredients' && localizedProduct.ingredientsTranslations) {
      return localizedProduct.ingredientsTranslations[language] || product.ingredients;
    }
    
    return product[field];
  };

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-12 text-center">
          <p className="text-lg text-muted-foreground">{t('product.notFound')}</p>
          <Link to="/shop" className="text-primary hover:underline mt-4 inline-block">
            {t('cart.continue')}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-12">
        {/* Breadcrumb navigation */}
        <div className="mb-8">
          <Link 
            to="/shop" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} className={`mr-2 rtl-mirror ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            {t('cart.continue')}
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg overflow-hidden border border-border">
            <div className="aspect-square relative">
              <img 
                src={product.image} 
                alt={getLocalizedText('name')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-serif font-semibold mb-2">
              {getLocalizedText('name')}
            </h1>
            
            <div className="text-sm text-muted-foreground uppercase mb-4">
              {getLocalizedText('category')}
            </div>
            
            <div className="text-2xl font-semibold mb-6">
              {product.price.toFixed(2)} TND
            </div>
            
            <p className="text-muted-foreground mb-8">
              {getLocalizedText('description')}
            </p>
            
            {/* Quantity selector */}
            <div className="flex items-center mb-6">
              <span className="mr-4">{t('product.quantity')}:</span>
              <div className="flex items-center border border-border rounded-md">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-2 border-r border-border"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} className="text-muted-foreground" />
                </button>
                <span className="px-6 py-2">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-2 border-l border-border"
                  disabled={quantity >= (product?.stock || 1)}
                >
                  <Plus size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Stock status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="text-sm">
                  {product.stock < 5 ? (
                    <span className="text-yellow-600">{t('product.onlyLeft', { count: product.stock })}</span>
                  ) : (
                    <span className="text-green-600">{t('product.inStock')}</span>
                  )}
                </span>
              ) : (
                <span className="text-destructive">{t('product.outOfStock')}</span>
              )}
            </div>
            
            {/* Add to cart button */}
            <div className="mb-8">
              <Button
                onClick={handleAddToCart}
                className="w-full sm:w-auto px-8 py-6 text-lg"
                disabled={product.stock <= 0}
              >
                {t('product.addToCart')}
              </Button>
            </div>
            
            {/* Product tabs */}
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">{t('product.details')}</TabsTrigger>
                <TabsTrigger value="ingredients">{t('product.ingredients')}</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-4">
                <p className="text-muted-foreground">
                  {getLocalizedText('description')}
                </p>
              </TabsContent>
              <TabsContent value="ingredients" className="pt-4">
                <p className="text-muted-foreground">
                  {getLocalizedText('ingredients')}
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-semibold mb-8">
              {t('product.related')}
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
