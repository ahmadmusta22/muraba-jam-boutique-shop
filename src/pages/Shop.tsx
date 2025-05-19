import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getShopProducts, Product } from '@/lib/firestore';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { categories } from '@/data/products';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price' | 'name' | 'createdAt'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Set selectedCategory from URL on mount
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy, sortOrder]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getShopProducts({
        category: selectedCategory || undefined,
        sortBy,
        sortOrder,
      });
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter out the "all" category for display
  const displayCategories = categories.filter(cat => cat.id !== 'all');

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-serif font-semibold">{t('shop.title')}</h1>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Input
              placeholder={t('shop.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64"
            />
            <Select 
              value={selectedCategory || 'all'} 
              onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t('shop.allCategories')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('shop.allCategories')}</SelectItem>
                {displayCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {t(`category.${category.id}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(value: 'price' | 'name' | 'createdAt') => setSortBy(value)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder={t('shop.sortBy')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">{t('shop.sortByPrice')}</SelectItem>
                <SelectItem value="name">{t('shop.sortByName')}</SelectItem>
                <SelectItem value="createdAt">{t('shop.sortByNewest')}</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-serif font-semibold mb-2">{t('shop.noProducts')}</h2>
            <p className="text-muted-foreground">{t('shop.tryAdjustingFilters')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
                  <div className="aspect-w-1 aspect-h-1 w-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-serif font-medium mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {product.stock} {t('shop.inStock')}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
