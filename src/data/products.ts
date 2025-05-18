
import { Product } from '../contexts/CartContext';

export interface LocalizedProduct extends Product {
  nameTranslations: {
    en: string;
    fr: string;
    ar: string;
  };
  descriptionTranslations: {
    en: string;
    fr: string;
    ar: string;
  };
  ingredientsTranslations: {
    en: string;
    fr: string;
    ar: string;
  };
  categoryTranslations: {
    en: string;
    fr: string;
    ar: string;
  };
}

export const products: LocalizedProduct[] = [
  {
    id: "1",
    name: "Strawberry Jam",
    nameTranslations: {
      en: "Strawberry Jam",
      fr: "Confiture de Fraises",
      ar: "مربى الفراولة"
    },
    price: 12.99,
    image: "/lovable-uploads/f79e4c9f-b907-4a8a-9304-eb510866f0a9.png", 
    category: "fruit-based",
    categoryTranslations: {
      en: "Fruit-based",
      fr: "À base de fruits",
      ar: "مربى الفواكه"
    },
    description: "Our signature strawberry jam made with hand-picked Tunisian strawberries. A perfect blend of sweetness and tartness that pairs beautifully with fresh bread or pastries.",
    descriptionTranslations: {
      en: "Our signature strawberry jam made with hand-picked Tunisian strawberries. A perfect blend of sweetness and tartness that pairs beautifully with fresh bread or pastries.",
      fr: "Notre confiture de fraises signature faite avec des fraises tunisiennes cueillies à la main. Un mélange parfait de douceur et d'acidité qui se marie magnifiquement avec du pain frais ou des pâtisseries.",
      ar: "مربى الفراولة الخاص بنا المصنوع من الفراولة التونسية المقطوفة يدويًا. مزيج مثالي من الحلاوة والحموضة يتناغم بشكل رائع مع الخبز الطازج أو المعجنات."
    },
    ingredients: "Strawberries, sugar, lemon juice, pectin",
    ingredientsTranslations: {
      en: "Strawberries, sugar, lemon juice, pectin",
      fr: "Fraises, sucre, jus de citron, pectine",
      ar: "فراولة، سكر، عصير ليمون، بكتين"
    },
    stock: 15
  },
  {
    id: "2",
    name: "Fig & Walnut Preserve",
    nameTranslations: {
      en: "Fig & Walnut Preserve",
      fr: "Confiture de Figues et Noix",
      ar: "مربى التين والجوز"
    },
    price: 14.99,
    image: "/lovable-uploads/f79e4c9f-b907-4a8a-9304-eb510866f0a9.png",
    category: "premium",
    categoryTranslations: {
      en: "Premium",
      fr: "Premium",
      ar: "فاخر"
    },
    description: "A luxurious spread combining the sweetness of figs with the nutty crunch of walnuts. This preserve captures the essence of Tunisian countryside flavors.",
    descriptionTranslations: {
      en: "A luxurious spread combining the sweetness of figs with the nutty crunch of walnuts. This preserve captures the essence of Tunisian countryside flavors.",
      fr: "Une tartinade luxueuse combinant la douceur des figues avec le croquant des noix. Cette confiture capture l'essence des saveurs de la campagne tunisienne.",
      ar: "مربى فاخر يجمع بين حلاوة التين وقرمشة الجوز. يلتقط هذا المربى جوهر نكهات الريف التونسي."
    },
    ingredients: "Figs, walnuts, sugar, lemon juice, vanilla bean",
    ingredientsTranslations: {
      en: "Figs, walnuts, sugar, lemon juice, vanilla bean",
      fr: "Figues, noix, sucre, jus de citron, gousse de vanille",
      ar: "تين، جوز، سكر، عصير ليمون، فانيليا"
    },
    stock: 8
  },
  {
    id: "3",
    name: "Organic Orange Marmalade",
    nameTranslations: {
      en: "Organic Orange Marmalade",
      fr: "Marmelade d'Orange Biologique",
      ar: "مربى البرتقال العضوي"
    },
    price: 13.99,
    image: "/lovable-uploads/f79e4c9f-b907-4a8a-9304-eb510866f0a9.png",
    category: "organic",
    categoryTranslations: {
      en: "Organic",
      fr: "Biologique",
      ar: "عضوي"
    },
    description: "Made with organic bitter oranges from Tunisia's Cap Bon region, this marmalade offers a bright, zesty flavor with a perfect balance of sweetness and bitterness.",
    descriptionTranslations: {
      en: "Made with organic bitter oranges from Tunisia's Cap Bon region, this marmalade offers a bright, zesty flavor with a perfect balance of sweetness and bitterness.",
      fr: "Fabriquée avec des oranges amères biologiques de la région du Cap Bon en Tunisie, cette marmelade offre une saveur vive et piquante avec un équilibre parfait entre douceur et amertume.",
      ar: "مصنوع من البرتقال العضوي المر من منطقة كاب بون في تونس، يقدم هذا المربى نكهة منعشة ومنعشة مع توازن مثالي بين الحلاوة والمرارة."
    },
    ingredients: "Organic oranges, organic sugar, lemon juice",
    ingredientsTranslations: {
      en: "Organic oranges, organic sugar, lemon juice",
      fr: "Oranges biologiques, sucre biologique, jus de citron",
      ar: "برتقال عضوي، سكر عضوي، عصير ليمون"
    },
    stock: 12
  },
  {
    id: "4",
    name: "Sugar-Free Apricot Jam",
    nameTranslations: {
      en: "Sugar-Free Apricot Jam",
      fr: "Confiture d'Abricot Sans Sucre",
      ar: "مربى المشمش بدون سكر"
    },
    price: 15.99,
    image: "/lovable-uploads/f79e4c9f-b907-4a8a-9304-eb510866f0a9.png",
    category: "sugar-free",
    categoryTranslations: {
      en: "Sugar-free",
      fr: "Sans sucre",
      ar: "خالي من السكر"
    },
    description: "Enjoy the natural sweetness of Tunisian apricots without added sugar. Sweetened only with grape juice concentrate for a healthier alternative.",
    descriptionTranslations: {
      en: "Enjoy the natural sweetness of Tunisian apricots without added sugar. Sweetened only with grape juice concentrate for a healthier alternative.",
      fr: "Profitez de la douceur naturelle des abricots tunisiens sans sucre ajouté. Sucré uniquement avec du concentré de jus de raisin pour une alternative plus saine.",
      ar: "استمتع بالحلاوة الطبيعية للمشمش التونسي بدون سكر مضاف. محلى فقط بمركز عصير العنب كبديل صحي."
    },
    ingredients: "Apricots, grape juice concentrate, lemon juice, pectin",
    ingredientsTranslations: {
      en: "Apricots, grape juice concentrate, lemon juice, pectin",
      fr: "Abricots, concentré de jus de raisin, jus de citron, pectine",
      ar: "مشمش، مركز عصير العنب، عصير ليمون، بكتين"
    },
    stock: 10
  },
  {
    id: "5",
    name: "Date & Cinnamon Spread",
    nameTranslations: {
      en: "Date & Cinnamon Spread",
      fr: "Tartinade de Dattes et Cannelle",
      ar: "معجون التمر والقرفة"
    },
    price: 16.99,
    image: "/lovable-uploads/f79e4c9f-b907-4a8a-9304-eb510866f0a9.png",
    category: "premium",
    categoryTranslations: {
      en: "Premium",
      fr: "Premium",
      ar: "فاخر"
    },
    description: "A rich, velvety spread made with Tunisia's famous Deglet Noor dates and aromatic cinnamon. Perfect for breakfast or as a topping for desserts.",
    descriptionTranslations: {
      en: "A rich, velvety spread made with Tunisia's famous Deglet Noor dates and aromatic cinnamon. Perfect for breakfast or as a topping for desserts.",
      fr: "Une tartinade riche et veloutée préparée avec les célèbres dattes Deglet Noor de Tunisie et de la cannelle aromatique. Parfait pour le petit déjeuner ou comme garniture pour les desserts.",
      ar: "معجون غني وناعم مصنوع من تمر دقلة نور التونسي الشهير والقرفة العطرية. مثالي للإفطار أو كطبقة علوية للحلويات."
    },
    ingredients: "Dates, water, cinnamon, lemon juice",
    ingredientsTranslations: {
      en: "Dates, water, cinnamon, lemon juice",
      fr: "Dattes, eau, cannelle, jus de citron",
      ar: "تمر، ماء، قرفة، عصير ليمون"
    },
    stock: 7
  },
  {
    id: "6",
    name: "Pomegranate Jelly",
    nameTranslations: {
      en: "Pomegranate Jelly",
      fr: "Gelée de Grenade",
      ar: "هلام الرمان"
    },
    price: 17.99,
    image: "/lovable-uploads/f79e4c9f-b907-4a8a-9304-eb510866f0a9.png",
    category: "fruit-based",
    categoryTranslations: {
      en: "Fruit-based",
      fr: "À base de fruits",
      ar: "مربى الفواكه"
    },
    description: "A ruby-red jelly with the perfect balance of sweet and tart, made from pomegranates grown in northern Tunisia. A delightful accompaniment to cheeses.",
    descriptionTranslations: {
      en: "A ruby-red jelly with the perfect balance of sweet and tart, made from pomegranates grown in northern Tunisia. A delightful accompaniment to cheeses.",
      fr: "Une gelée rouge rubis avec un équilibre parfait entre le sucré et l'acidulé, faite à partir de grenades cultivées dans le nord de la Tunisie. Un accompagnement délicieux pour les fromages.",
      ar: "هلام أحمر الياقوت مع توازن مثالي بين الحلاوة والحموضة، مصنوع من الرمان المزروع في شمال تونس. مرافق لذيذ للجبن."
    },
    ingredients: "Pomegranate juice, sugar, lemon juice, pectin",
    ingredientsTranslations: {
      en: "Pomegranate juice, sugar, lemon juice, pectin",
      fr: "Jus de grenade, sucre, jus de citron, pectine",
      ar: "عصير رمان، سكر، عصير ليمون، بكتين"
    },
    stock: 9
  },
  {
    id: "7",
    name: "Organic Quince Preserve",
    nameTranslations: {
      en: "Organic Quince Preserve",
      fr: "Confiture de Coing Biologique",
      ar: "مربى السفرجل العضوي"
    },
    price: 18.99,
    image: "/lovable-uploads/f79e4c9f-b907-4a8a-9304-eb510866f0a9.png",
    category: "organic",
    categoryTranslations: {
      en: "Organic",
      fr: "Biologique",
      ar: "عضوي"
    },
    description: "A traditional Tunisian preserve made from organic quinces, slow-cooked to bring out their floral aroma and unique flavor.",
    descriptionTranslations: {
      en: "A traditional Tunisian preserve made from organic quinces, slow-cooked to bring out their floral aroma and unique flavor.",
      fr: "Une confiture traditionnelle tunisienne faite à partir de coings biologiques, cuits lentement pour faire ressortir leur arôme floral et leur saveur unique.",
      ar: "مربى تونسي تقليدي مصنوع من السفرجل العضوي، مطبوخ ببطء لإبراز عطره الزهري ونكهته الفريدة."
    },
    ingredients: "Organic quinces, organic sugar, lemon juice, vanilla",
    ingredientsTranslations: {
      en: "Organic quinces, organic sugar, lemon juice, vanilla",
      fr: "Coings biologiques, sucre biologique, jus de citron, vanille",
      ar: "سفرجل عضوي، سكر عضوي، عصير ليمون، فانيليا"
    },
    stock: 6
  },
  {
    id: "8",
    name: "Sugar-Free Berry Medley",
    nameTranslations: {
      en: "Sugar-Free Berry Medley",
      fr: "Mélange de Baies Sans Sucre",
      ar: "تشكيلة توت بدون سكر"
    },
    price: 19.99,
    image: "/lovable-uploads/f79e4c9f-b907-4a8a-9304-eb510866f0a9.png",
    category: "sugar-free",
    categoryTranslations: {
      en: "Sugar-free",
      fr: "Sans sucre",
      ar: "خالي من السكر"
    },
    description: "A delightful mix of berries sweetened only with natural fruit juices. Contains strawberries, blackberries, and blueberries.",
    descriptionTranslations: {
      en: "A delightful mix of berries sweetened only with natural fruit juices. Contains strawberries, blackberries, and blueberries.",
      fr: "Un délicieux mélange de baies sucré uniquement avec des jus de fruits naturels. Contient des fraises, des mûres et des myrtilles.",
      ar: "مزيج رائع من التوت محلى فقط بعصائر الفاكهة الطبيعية. يحتوي على فراولة، توت أسود، وتوت أزرق."
    },
    ingredients: "Mixed berries, apple juice concentrate, lemon juice, pectin",
    ingredientsTranslations: {
      en: "Mixed berries, apple juice concentrate, lemon juice, pectin",
      fr: "Mélange de baies, concentré de jus de pomme, jus de citron, pectine",
      ar: "توت مشكل، مركز عصير تفاح، عصير ليمون، بكتين"
    },
    stock: 14
  }
];

export const categories = [
  { id: "all", name: "All Products" },
  { id: "fruit-based", name: "Fruit-based" },
  { id: "sugar-free", name: "Sugar-free" },
  { id: "organic", name: "Organic" },
  { id: "premium", name: "Premium" }
];

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string) => {
  if (categoryId === "all") {
    return products;
  }
  return products.filter(product => product.category === categoryId);
};
