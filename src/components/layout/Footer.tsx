
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail } from 'lucide-react';

const Footer = () => {
  const { t, dir } = useLanguage();

  return (
    <footer className="bg-muted text-muted-foreground mt-16">
      <div className="container-custom py-12">
        {/* Footer content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-bold text-primary">Muraba</span>
            </Link>
            <p className="mb-4">
              Premium Tunisian jams crafted with passion and tradition. Delivering quality and taste nationwide.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-medium text-lg mb-4">{t('footer.about')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-primary transition-colors">
                  {t('nav.shop')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-medium text-lg mb-4">{t('footer.shipping')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="hover:text-primary transition-colors">
                  {t('footer.shipping')}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-primary transition-colors">
                  {t('footer.returns')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-lg mb-4">{t('footer.newsletter')}</h3>
            <p className="mb-4">
              Stay updated on our latest products and exclusive offers.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email" 
                className="flex-grow rounded-l-md border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-r-md px-4 py-2 flex items-center justify-center"
              >
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8 text-sm text-center">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
