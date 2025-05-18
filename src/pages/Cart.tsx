
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  const { t } = useLanguage();
  const { items, removeItem, updateQuantity, subtotal, tax, shipping, total } = useCart();

  const handleQuantityChange = (productId: string, currentQuantity: number, change: number) => {
    updateQuantity(productId, currentQuantity + change);
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-8">
          {t('cart.title')}
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-medium mb-4">{t('cart.empty')}</h2>
            <p className="text-muted-foreground mb-6">
              Your shopping cart is empty. Add some products to your cart.
            </p>
            <Link to="/shop">
              <Button size="lg">{t('cart.continue')}</Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4">Product</th>
                      <th className="text-center p-4">Quantity</th>
                      <th className="text-right p-4">Price</th>
                      <th className="p-4 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.product.id} className="border-t border-border">
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className="w-16 h-16 flex-shrink-0 bg-muted rounded overflow-hidden mr-4">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{item.product.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center border border-border rounded-md max-w-[120px] mx-auto">
                            <button 
                              onClick={() => handleQuantityChange(item.product.id, item.quantity, -1)}
                              className="px-2 py-1 border-r border-border"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} className="text-muted-foreground" />
                            </button>
                            <span className="px-4 py-1">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.product.id, item.quantity, 1)}
                              className="px-2 py-1 border-l border-border"
                              disabled={item.quantity >= item.product.stock}
                            >
                              <Plus size={14} className="text-muted-foreground" />
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right font-medium">
                          {(item.product.price * item.quantity).toFixed(2)} TND
                        </td>
                        <td className="p-4">
                          <button 
                            onClick={() => removeItem(item.product.id)}
                            className="text-muted-foreground hover:text-destructive"
                            aria-label="Remove item"
                          >
                            <X size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white border border-border rounded-lg p-6">
                <h2 className="text-xl font-medium mb-4">{t('cart.subtotal')}</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('cart.subtotal')}:</span>
                    <span>{subtotal.toFixed(2)} TND</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('cart.tax')}:</span>
                    <span>{tax.toFixed(2)} TND</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('cart.shipping')}:</span>
                    <span>{shipping.toFixed(2)} TND</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>{t('cart.total')}:</span>
                    <span>{total.toFixed(2)} TND</span>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button className="w-full">{t('cart.checkout')}</Button>
                </Link>
                <Link to="/shop">
                  <Button variant="outline" className="w-full mt-3">
                    {t('cart.continue')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
