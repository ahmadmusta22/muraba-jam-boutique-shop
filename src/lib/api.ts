import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';

export async function getStats() {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const productsSnapshot = await getDocs(collection(db, 'products'));
    const messagesQuery = query(
      collection(db, 'messages'),
      where('read', '==', false)
    );
    const messagesSnapshot = await getDocs(messagesQuery);

    // Get recent orders for revenue calculation
    const ordersQuery = query(
      collection(db, 'orders'),
      where('status', '==', 'completed'),
      orderBy('createdAt', 'desc'),
      limit(30) // Last 30 days
    );
    const ordersSnapshot = await getDocs(ordersQuery);
    
    const revenue = ordersSnapshot.docs.reduce((total, doc) => {
      const order = doc.data();
      return total + (order.total || 0);
    }, 0);

    return {
      totalUsers: usersSnapshot.size,
      totalProducts: productsSnapshot.size,
      newMessages: messagesSnapshot.size,
      revenue,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      totalUsers: 0,
      totalProducts: 0,
      newMessages: 0,
      revenue: 0,
    };
  }
}

export async function getRecentActivity() {
  try {
    const activityQuery = query(
      collection(db, 'activity'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );
    const snapshot = await getDocs(activityQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    return [];
  }
}

export async function getRecentMessages() {
  try {
    const messagesQuery = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'desc'),
      limit(5)
    );
    const snapshot = await getDocs(messagesQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching recent messages:', error);
    return [];
  }
} 