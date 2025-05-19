import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp,
  DocumentData,
  limit
} from 'firebase/firestore';
import { db } from './firebase';

// Types
export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id?: string;
  userId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Products
export const getProducts = async (): Promise<Product[]> => {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  })) as Product[];
};

export const getProduct = async (id: string): Promise<Product | null> => {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return {
    id: docSnap.id,
    ...docSnap.data(),
    createdAt: docSnap.data().createdAt?.toDate(),
    updatedAt: docSnap.data().updatedAt?.toDate(),
  } as Product;
};

export const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const productsRef = collection(db, 'products');
  const now = new Date();
  const docRef = await addDoc(productsRef, {
    ...product,
    createdAt: Timestamp.fromDate(now),
    updatedAt: Timestamp.fromDate(now),
  });
  return docRef.id;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, {
    ...product,
    updatedAt: Timestamp.fromDate(new Date()),
  });
};

export const deleteProduct = async (id: string): Promise<void> => {
  const docRef = doc(db, 'products', id);
  await deleteDoc(docRef);
};

// Orders
export const getOrders = async (): Promise<Order[]> => {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  })) as Order[];
};

export const getOrder = async (id: string): Promise<Order | null> => {
  const docRef = doc(db, 'orders', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return {
    id: docSnap.id,
    ...docSnap.data(),
    createdAt: docSnap.data().createdAt?.toDate(),
    updatedAt: docSnap.data().updatedAt?.toDate(),
  } as Order;
};

export const updateOrderStatus = async (id: string, status: Order['status']): Promise<void> => {
  const docRef = doc(db, 'orders', id);
  await updateDoc(docRef, {
    status,
    updatedAt: Timestamp.fromDate(new Date()),
  });
};

// Users
export const getUsers = async (): Promise<DocumentData[]> => {
  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getUser = async (id: string): Promise<DocumentData | null> => {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};

export const updateUser = async (id: string, data: Partial<DocumentData>): Promise<void> => {
  const docRef = doc(db, 'users', id);
  await updateDoc(docRef, data);
};

// Statistics
export const getDashboardStats = async () => {
  const [products, orders, users] = await Promise.all([
    getProducts(),
    getOrders(),
    getUsers(),
  ]);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const lowStockProducts = products.filter(product => product.stock < 10).length;

  return {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalUsers: users.length,
    totalRevenue,
    pendingOrders,
    lowStockProducts,
  };
};

// Shop Products
export const getShopProducts = async (options?: {
  category?: string;
  sortBy?: 'price' | 'name' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}): Promise<Product[]> => {
  const productsRef = collection(db, 'products');
  let q = query(productsRef);

  // Apply sorting first (this is the default index)
  if (options?.sortBy) {
    q = query(q, orderBy(options.sortBy, options.sortOrder || 'desc'));
  } else {
    // Default sort by createdAt
    q = query(q, orderBy('createdAt', 'desc'));
  }

  // Apply limit if provided
  if (options?.limit) {
    q = query(q, limit(options.limit));
  }

  const snapshot = await getDocs(q);
  let products = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  })) as Product[];

  // Apply category filter in memory if needed
  if (options?.category && options.category !== 'all') {
    products = products.filter(product => product.category === options.category);
  }

  return products;
};

// Get product categories
export const getProductCategories = async (): Promise<string[]> => {
  const productsRef = collection(db, 'products');
  const snapshot = await getDocs(productsRef);
  const categories = new Set<string>();
  
  snapshot.docs.forEach(doc => {
    const category = doc.data().category;
    if (category) {
      categories.add(category);
    }
  });

  return Array.from(categories);
};

export const getFeaturedProducts = async (limitCount = 4): Promise<Product[]> => {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('featured', '==', true), orderBy('createdAt', 'desc'), limit(limitCount));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
    updatedAt: doc.data().updatedAt?.toDate(),
  })) as Product[];
}; 