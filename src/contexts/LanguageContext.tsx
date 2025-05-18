
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.cart': 'Cart',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.account': 'My Account',
    'nav.orders': 'My Orders',
    'nav.wishlist': 'Wishlist',
    'nav.language': 'Language',
    
    // Home page
    'home.hero.title': 'Premium Tunisian Jams',
    'home.hero.subtitle': 'Handcrafted with love and tradition',
    'home.hero.cta': 'Shop Now',
    'home.featured': 'Featured Products',
    'home.bestsellers': 'Bestsellers',
    'home.new': 'New Arrivals',
    'home.categories': 'Browse Categories',
    'home.about.title': 'Our Story',
    'home.about.text': 'At Muraba, we craft premium jams using traditional Tunisian recipes and locally-sourced ingredients.',
    'home.testimonials': 'What Our Customers Say',
    
    // Product related
    'product.details': 'Details',
    'product.ingredients': 'Ingredients',
    'product.addToCart': 'Add to Cart',
    'product.buyNow': 'Buy Now',
    'product.outOfStock': 'Out of Stock',
    'product.filter': 'Filter',
    'product.sort': 'Sort By',
    'product.search': 'Search products...',
    'product.price': 'Price',
    'product.category': 'Category',
    'product.related': 'You may also like',
    
    // Categories
    'category.fruit': 'Fruit-based',
    'category.sugar-free': 'Sugar-free',
    'category.organic': 'Organic',
    'category.all': 'All Products',
    
    // Cart
    'cart.title': 'Your Cart',
    'cart.empty': 'Your cart is empty',
    'cart.continue': 'Continue Shopping',
    'cart.checkout': 'Proceed to Checkout',
    'cart.total': 'Total',
    'cart.subtotal': 'Subtotal',
    'cart.tax': 'Tax',
    'cart.shipping': 'Shipping',
    'cart.remove': 'Remove',
    'cart.update': 'Update',
    
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.contact': 'Contact Information',
    'checkout.shipping': 'Shipping Address',
    'checkout.payment': 'Payment Method',
    'checkout.review': 'Order Review',
    'checkout.place': 'Place Order',
    
    // Account
    'account.orders': 'Order History',
    'account.details': 'Account Details',
    'account.addresses': 'Saved Addresses',
    'account.logout': 'Logout',
    
    // Footer
    'footer.about': 'About Muraba',
    'footer.terms': 'Terms & Conditions',
    'footer.privacy': 'Privacy Policy',
    'footer.shipping': 'Shipping Policy',
    'footer.returns': 'Returns & Refunds',
    'footer.contact': 'Contact Us',
    'footer.newsletter': 'Subscribe to our newsletter',
    'footer.subscribe': 'Subscribe',
    'footer.rights': '© 2025 Muraba. All rights reserved.',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.shop': 'Boutique',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.cart': 'Panier',
    'nav.login': 'Connexion',
    'nav.signup': "S'inscrire",
    'nav.account': 'Mon Compte',
    'nav.orders': 'Mes Commandes',
    'nav.wishlist': 'Liste de Souhaits',
    'nav.language': 'Langue',
    
    // Home page
    'home.hero.title': 'Confitures Tunisiennes Premium',
    'home.hero.subtitle': 'Artisanales avec amour et tradition',
    'home.hero.cta': 'Acheter Maintenant',
    'home.featured': 'Produits Vedettes',
    'home.bestsellers': 'Meilleures Ventes',
    'home.new': 'Nouveautés',
    'home.categories': 'Parcourir les Catégories',
    'home.about.title': 'Notre Histoire',
    'home.about.text': 'Chez Muraba, nous élaborons des confitures premium en utilisant des recettes tunisiennes traditionnelles et des ingrédients locaux.',
    'home.testimonials': 'Ce que Disent Nos Clients',
    
    // Product related
    'product.details': 'Détails',
    'product.ingredients': 'Ingrédients',
    'product.addToCart': 'Ajouter au Panier',
    'product.buyNow': 'Acheter Maintenant',
    'product.outOfStock': 'Rupture de Stock',
    'product.filter': 'Filtrer',
    'product.sort': 'Trier Par',
    'product.search': 'Rechercher des produits...',
    'product.price': 'Prix',
    'product.category': 'Catégorie',
    'product.related': 'Vous pourriez aussi aimer',
    
    // Categories
    'category.fruit': 'À base de fruits',
    'category.sugar-free': 'Sans sucre',
    'category.organic': 'Biologique',
    'category.all': 'Tous les Produits',
    
    // Cart
    'cart.title': 'Votre Panier',
    'cart.empty': 'Votre panier est vide',
    'cart.continue': 'Continuer vos Achats',
    'cart.checkout': 'Procéder au Paiement',
    'cart.total': 'Total',
    'cart.subtotal': 'Sous-total',
    'cart.tax': 'Taxe',
    'cart.shipping': 'Livraison',
    'cart.remove': 'Supprimer',
    'cart.update': 'Mettre à jour',
    
    // Checkout
    'checkout.title': 'Paiement',
    'checkout.contact': 'Informations de Contact',
    'checkout.shipping': 'Adresse de Livraison',
    'checkout.payment': 'Méthode de Paiement',
    'checkout.review': 'Révision de la Commande',
    'checkout.place': 'Passer la Commande',
    
    // Account
    'account.orders': 'Historique des Commandes',
    'account.details': 'Détails du Compte',
    'account.addresses': 'Adresses Enregistrées',
    'account.logout': 'Déconnexion',
    
    // Footer
    'footer.about': 'À Propos de Muraba',
    'footer.terms': 'Conditions Générales',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.shipping': 'Politique de Livraison',
    'footer.returns': 'Retours et Remboursements',
    'footer.contact': 'Contactez-Nous',
    'footer.newsletter': 'Abonnez-vous à notre newsletter',
    'footer.subscribe': 'Souscrire',
    'footer.rights': '© 2025 Muraba. Tous droits réservés.',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.shop': 'المتجر',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.cart': 'السلة',
    'nav.login': 'تسجيل الدخول',
    'nav.signup': 'إنشاء حساب',
    'nav.account': 'حسابي',
    'nav.orders': 'طلباتي',
    'nav.wishlist': 'المفضلة',
    'nav.language': 'اللغة',
    
    // Home page
    'home.hero.title': 'مربى تونسي فاخر',
    'home.hero.subtitle': 'صناعة يدوية بالحب والتقاليد',
    'home.hero.cta': 'تسوق الآن',
    'home.featured': 'منتجات مميزة',
    'home.bestsellers': 'الأكثر مبيعا',
    'home.new': 'وصل حديثا',
    'home.categories': 'تصفح الفئات',
    'home.about.title': 'قصتنا',
    'home.about.text': 'في مربى، نصنع مربى فاخر باستخدام وصفات تونسية تقليدية ومكونات محلية المصدر.',
    'home.testimonials': 'ماذا يقول عملاؤنا',
    
    // Product related
    'product.details': 'التفاصيل',
    'product.ingredients': 'المكونات',
    'product.addToCart': 'أضف إلى السلة',
    'product.buyNow': 'اشتر الآن',
    'product.outOfStock': 'نفذ من المخزون',
    'product.filter': 'تصفية',
    'product.sort': 'ترتيب حسب',
    'product.search': 'ابحث عن منتجات...',
    'product.price': 'السعر',
    'product.category': 'الفئة',
    'product.related': 'قد يعجبك أيضا',
    
    // Categories
    'category.fruit': 'مربى الفواكه',
    'category.sugar-free': 'خالي من السكر',
    'category.organic': 'عضوي',
    'category.all': 'جميع المنتجات',
    
    // Cart
    'cart.title': 'سلتك',
    'cart.empty': 'سلتك فارغة',
    'cart.continue': 'متابعة التسوق',
    'cart.checkout': 'إتمام الشراء',
    'cart.total': 'الإجمالي',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.tax': 'الضريبة',
    'cart.shipping': 'الشحن',
    'cart.remove': 'إزالة',
    'cart.update': 'تحديث',
    
    // Checkout
    'checkout.title': 'الدفع',
    'checkout.contact': 'معلومات الاتصال',
    'checkout.shipping': 'عنوان الشحن',
    'checkout.payment': 'طريقة الدفع',
    'checkout.review': 'مراجعة الطلب',
    'checkout.place': 'تأكيد الطلب',
    
    // Account
    'account.orders': 'سجل الطلبات',
    'account.details': 'تفاصيل الحساب',
    'account.addresses': 'العناوين المحفوظة',
    'account.logout': 'تسجيل الخروج',
    
    // Footer
    'footer.about': 'عن مربى',
    'footer.terms': 'الشروط والأحكام',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.shipping': 'سياسة الشحن',
    'footer.returns': 'الإرجاع والاسترداد',
    'footer.contact': 'اتصل بنا',
    'footer.newsletter': 'اشترك في نشرتنا الإخبارية',
    'footer.subscribe': 'اشترك',
    'footer.rights': '© ٢٠٢٥ مربى. جميع الحقوق محفوظة.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    
    // Update HTML dir attribute for RTL support
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const translate = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage: changeLanguage,
    t: translate,
    dir: language === 'ar' ? 'rtl' : 'ltr' as "ltr" | "rtl"
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
