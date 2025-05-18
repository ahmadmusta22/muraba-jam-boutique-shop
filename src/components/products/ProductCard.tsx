
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage();
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="group bg-white border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative pt-[100%] overflow-hidden bg-muted">
          <img 
            src={product.image} 
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <Button
              onClick={handleAddToCart}
              size="icon"
              variant="secondary"
              className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              disabled={product.stock <= 0}
            >
              <ShoppingCart size={18} />
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="text-xs text-muted-foreground uppercase mb-1">
            {product.category}
          </div>
          <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="font-semibold">{product.price.toFixed(2)} TND</span>
            {product.stock <= 0 ? (
              <span className="text-xs text-destructive font-medium">{t('product.outOfStock')}</span>
            ) : (
              <span className="text-xs text-muted-foreground">
                {product.stock < 5 ? `Only ${product.stock} left` : 'In Stock'}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
