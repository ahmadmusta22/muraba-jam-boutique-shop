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
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.email': 'Email',
    'checkout.phone': 'Phone',
    'checkout.address': 'Address',
    'checkout.city': 'City',
    'checkout.postalCode': 'Postal Code',
    'checkout.cardHolder': 'Card Holder Name',
    'checkout.cardNumber': 'Card Number',
    'checkout.expiry': 'Expiry Date',
    'checkout.cvv': 'CVV',
    'checkout.firstNamePlaceholder': 'Enter your first name',
    'checkout.lastNamePlaceholder': 'Enter your last name',
    'checkout.emailPlaceholder': 'Enter your email address',
    'checkout.phonePlaceholder': 'Enter your phone number',
    'checkout.addressPlaceholder': 'Enter your street address',
    'checkout.cityPlaceholder': 'Enter your city',
    'checkout.postalCodePlaceholder': 'Enter postal code',
    'checkout.cardHolderPlaceholder': 'Name as it appears on card',
    'checkout.nextStep': 'Continue',
    'checkout.prevStep': 'Back',
    'checkout.placeOrder': 'Place Order',
    'checkout.orderSummary': 'Order Summary',
    'checkout.quantity': 'Quantity',
    'checkout.securePayment': 'Secure Payment',
    'checkout.secureInfo': 'Your payment information is encrypted and secure.',
    'checkout.orderSuccess': 'Order Placed Successfully!',
    'checkout.orderConfirmation': 'Thank you for your order. You will receive a confirmation email shortly.',
    'checkout.validation.firstName': 'First name must be at least 2 characters',
    'checkout.validation.lastName': 'Last name must be at least 2 characters',
    'checkout.validation.email': 'Please enter a valid email address',
    'checkout.validation.phone': 'Phone number must be at least 8 digits',
    'checkout.validation.address': 'Address must be at least 5 characters',
    'checkout.validation.city': 'City must be at least 2 characters',
    'checkout.validation.postalCode': 'Postal code must be at least 4 digits',
    'checkout.validation.cardHolder': 'Card holder name must be at least 3 characters',
    'checkout.validation.cardNumber': 'Please enter a valid card number',
    'checkout.validation.expiry': 'Please enter a valid expiry date (MM/YY)',
    'checkout.validation.cvv': 'CVV must be at least 3 digits',
    
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
    'checkout.firstName': 'Prénom',
    'checkout.lastName': 'Nom',
    'checkout.email': 'Email',
    'checkout.phone': 'Téléphone',
    'checkout.address': 'Adresse',
    'checkout.city': 'Ville',
    'checkout.postalCode': 'Code Postal',
    'checkout.cardHolder': 'Nom du Titulaire',
    'checkout.cardNumber': 'Numéro de Carte',
    'checkout.expiry': 'Date d\'Expiration',
    'checkout.cvv': 'CVV',
    'checkout.firstNamePlaceholder': 'Entrez votre prénom',
    'checkout.lastNamePlaceholder': 'Entrez votre nom',
    'checkout.emailPlaceholder': 'Entrez votre adresse email',
    'checkout.phonePlaceholder': 'Entrez votre numéro de téléphone',
    'checkout.addressPlaceholder': 'Entrez votre adresse',
    'checkout.cityPlaceholder': 'Entrez votre ville',
    'checkout.postalCodePlaceholder': 'Entrez votre code postal',
    'checkout.cardHolderPlaceholder': 'Nom tel qu\'il apparaît sur la carte',
    'checkout.nextStep': 'Continuer',
    'checkout.prevStep': 'Retour',
    'checkout.placeOrder': 'Passer la Commande',
    'checkout.orderSummary': 'Récapitulatif de la Commande',
    'checkout.quantity': 'Quantité',
    'checkout.securePayment': 'Paiement Sécurisé',
    'checkout.secureInfo': 'Vos informations de paiement sont cryptées et sécurisées.',
    'checkout.orderSuccess': 'Commande Passée avec Succès!',
    'checkout.orderConfirmation': 'Merci pour votre commande. Vous recevrez un email de confirmation sous peu.',
    'checkout.validation.firstName': 'Le prénom doit contenir au moins 2 caractères',
    'checkout.validation.lastName': 'Le nom doit contenir au moins 2 caractères',
    'checkout.validation.email': 'Veuillez saisir une adresse email valide',
    'checkout.validation.phone': 'Le numéro de téléphone doit contenir au moins 8 chiffres',
    'checkout.validation.address': 'L\'adresse doit contenir au moins 5 caractères',
    'checkout.validation.city': 'La ville doit contenir au moins 2 caractères',
    'checkout.validation.postalCode': 'Le code postal doit contenir au moins 4 chiffres',
    'checkout.validation.cardHolder': 'Le nom du titulaire doit contenir au moins 3 caractères',
    'checkout.validation.cardNumber': 'Veuillez saisir un numéro de carte valide',
    'checkout.validation.expiry': 'Veuillez saisir une date d\'expiration valide (MM/AA)',
    'checkout.validation.cvv': 'Le CVV doit contenir au moins 3 chiffres',
    
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
    'checkout.title': 'إتمام الشراء',
    'checkout.contact': 'معلومات الاتصال',
    'checkout.shipping': 'عنوان الشحن',
    'checkout.payment': 'طريقة الدفع',
    'checkout.review': 'مراجعة الطلب',
    'checkout.place': 'تأكيد الطلب',
    'checkout.firstName': 'الاسم الأول',
    'checkout.lastName': 'اسم العائلة',
    'checkout.email': 'البريد الإلكتروني',
    'checkout.phone': 'رقم الهاتف',
    'checkout.address': 'العنوان',
    'checkout.city': 'المدينة',
    'checkout.postalCode': 'الرمز البريدي',
    'checkout.cardHolder': 'اسم حامل البطاقة',
    'checkout.cardNumber': 'رقم البطاقة',
    'checkout.expiry': 'تاريخ الانتهاء',
    'checkout.cvv': 'رمز التحقق',
    'checkout.firstNamePlaceholder': 'أدخل اسمك الأول',
    'checkout.lastNamePlaceholder': 'أدخل اسم عائلتك',
    'checkout.emailPlaceholder': 'أدخل بريدك الإلكتروني',
    'checkout.phonePlaceholder': 'أدخل رقم هاتفك',
    'checkout.addressPlaceholder': 'أدخل عنوانك',
    'checkout.cityPlaceholder': 'أدخل مدينتك',
    'checkout.postalCodePlaceholder': 'أدخل الرمز البريدي',
    'checkout.cardHolderPlaceholder': 'الاسم كما يظهر على البطاقة',
    'checkout.nextStep': 'متابعة',
    'checkout.prevStep': 'رجوع',
    'checkout.placeOrder': 'تأكيد الطلب',
    'checkout.orderSummary': 'ملخص الطلب',
    'checkout.quantity': 'الكمية',
    'checkout.securePayment': 'دفع آمن',
    'checkout.secureInfo': 'معلومات الدفع الخاصة بك مشفرة وآمنة.',
    'checkout.orderSuccess': 'تم تقديم الطلب بنجاح!',
    'checkout.orderConfirmation': 'شكرا لطلبك. سوف تتلقى رسالة تأكيد بالبريد الإلكتروني قريبًا.',
    'checkout.validation.firstName': 'يجب أن يحتوي الاسم الأول على الأقل على حرفين',
    'checkout.validation.lastName': 'يجب أن يحتوي اسم العائلة على الأقل على حرفين',
    'checkout.validation.email': 'الرجاء إدخال بريد إلكتروني صالح',
    'checkout.validation.phone': 'يجب أن يحتوي رقم الهاتف على الأقل على 8 أرقام',
    'checkout.validation.address': 'يجب أن يحتوي العنوان على الأقل على 5 أحرف',
    'checkout.validation.city': 'يجب أن تحتوي المدينة على الأقل على حرفين',
    'checkout.validation.postalCode': 'يجب أن يحتوي الرمز البريدي على الأقل على 4 أرقام',
    'checkout.validation.cardHolder': 'يجب أن يحتوي اسم حامل البطاقة على الأقل على 3 أحرف',
    'checkout.validation.cardNumber': 'الرجاء إدخال رقم بطاقة صالح',
    'checkout.validation.expiry': 'الرجاء إدخال تاريخ انتهاء صالح (MM/YY)',
    'checkout.validation.cvv': 'يجب أن يحتوي رمز التحقق على الأقل على 3 أرقام',
    
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
