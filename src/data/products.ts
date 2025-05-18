
import { Product } from '../contexts/CartContext';

export const products: Product[] = [
  {
    id: "1",
    name: "Strawberry Jam",
    price: 12.99,
    image: "/placeholder.svg", 
    category: "fruit-based",
    description: "Our signature strawberry jam made with hand-picked Tunisian strawberries. A perfect blend of sweetness and tartness that pairs beautifully with fresh bread or pastries.",
    ingredients: "Strawberries, sugar, lemon juice, pectin",
    stock: 15
  },
  {
    id: "2",
    name: "Fig & Walnut Preserve",
    price: 14.99,
    image: "/placeholder.svg",
    category: "premium",
    description: "A luxurious spread combining the sweetness of figs with the nutty crunch of walnuts. This preserve captures the essence of Tunisian countryside flavors.",
    ingredients: "Figs, walnuts, sugar, lemon juice, vanilla bean",
    stock: 8
  },
  {
    id: "3",
    name: "Organic Orange Marmalade",
    price: 13.99,
    image: "/placeholder.svg",
    category: "organic",
    description: "Made with organic bitter oranges from Tunisia's Cap Bon region, this marmalade offers a bright, zesty flavor with a perfect balance of sweetness and bitterness.",
    ingredients: "Organic oranges, organic sugar, lemon juice",
    stock: 12
  },
  {
    id: "4",
    name: "Sugar-Free Apricot Jam",
    price: 15.99,
    image: "/placeholder.svg",
    category: "sugar-free",
    description: "Enjoy the natural sweetness of Tunisian apricots without added sugar. Sweetened only with grape juice concentrate for a healthier alternative.",
    ingredients: "Apricots, grape juice concentrate, lemon juice, pectin",
    stock: 10
  },
  {
    id: "5",
    name: "Date & Cinnamon Spread",
    price: 16.99,
    image: "/placeholder.svg",
    category: "premium",
    description: "A rich, velvety spread made with Tunisia's famous Deglet Noor dates and aromatic cinnamon. Perfect for breakfast or as a topping for desserts.",
    ingredients: "Dates, water, cinnamon, lemon juice",
    stock: 7
  },
  {
    id: "6",
    name: "Pomegranate Jelly",
    price: 17.99,
    image: "/placeholder.svg",
    category: "fruit-based",
    description: "A ruby-red jelly with the perfect balance of sweet and tart, made from pomegranates grown in northern Tunisia. A delightful accompaniment to cheeses.",
    ingredients: "Pomegranate juice, sugar, lemon juice, pectin",
    stock: 9
  },
  {
    id: "7",
    name: "Organic Quince Preserve",
    price: 18.99,
    image: "/placeholder.svg",
    category: "organic",
    description: "A traditional Tunisian preserve made from organic quinces, slow-cooked to bring out their floral aroma and unique flavor.",
    ingredients: "Organic quinces, organic sugar, lemon juice, vanilla",
    stock: 6
  },
  {
    id: "8",
    name: "Sugar-Free Berry Medley",
    price: 19.99,
    image: "/placeholder.svg",
    category: "sugar-free",
    description: "A delightful mix of berries sweetened only with natural fruit juices. Contains strawberries, blackberries, and blueberries.",
    ingredients: "Mixed berries, apple juice concentrate, lemon juice, pectin",
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
