
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories } from '@/data/products';

interface CategoryFilterProps {
  selected: string;
  onChange: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selected, onChange }) => {
  const { t } = useLanguage();

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3">{t('product.category')}</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              selected === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            {t(`category.${category.id}`) !== `category.${category.id}` 
              ? t(`category.${category.id}`) 
              : category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
