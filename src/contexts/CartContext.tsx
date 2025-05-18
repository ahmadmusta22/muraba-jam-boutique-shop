
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define types
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  ingredients?: string;
  stock: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const TAX_RATE = 0.19; // 19% VAT for Tunisia
  const SHIPPING_BASE = 7; // Base shipping cost in TND

  // Load cart from localStorage on initial mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('murabaCart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('murabaCart', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }

    // Update derived values
    let count = 0;
    let total = 0;
    items.forEach(item => {
      count += item.quantity;
      total += item.product.price * item.quantity;
    });
    setItemCount(count);
    setSubtotal(total);
  }, [items]);

  // Add an item to the cart
  const addItem = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: Math.min(newQuantity, product.stock) // Don't exceed available stock
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { product, quantity: Math.min(quantity, product.stock) }];
      }
    });
  };

  // Remove an item from the cart
  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: Math.min(Math.max(1, quantity), item.product.stock) // Ensure between 1 and available stock
          };
        }
        return item;
      });
    });
  };

  // Clear the cart
  const clearCart = () => {
    setItems([]);
  };

  // Calculate derived values
  const tax = subtotal * TAX_RATE;
  const shipping = itemCount > 0 ? SHIPPING_BASE : 0;
  const total = subtotal + tax + shipping;

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    tax,
    shipping,
    total
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
