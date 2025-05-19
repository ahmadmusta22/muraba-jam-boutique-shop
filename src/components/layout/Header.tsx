import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, ShoppingCart, Search, Globe, ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const { itemCount } = useCart();
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Muraba Logo" className="h-10 w-auto mr-2" />
              <span className="font-serif text-2xl font-bold text-primary">Muraba</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className={`flex ${language === 'ar' ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
              <li>
                <Link to="/" className="font-medium text-muted-foreground hover:text-primary transition-colors px-1">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/shop" className="font-medium text-muted-foreground hover:text-primary transition-colors px-1">
                  {t('nav.shop')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="font-medium text-muted-foreground hover:text-primary transition-colors px-1">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-medium text-muted-foreground hover:text-primary transition-colors px-1">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search toggle */}
            <button 
              className="text-muted-foreground hover:text-primary" 
              onClick={toggleSearch} 
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="px-2">
                  <Globe size={20} className="mr-1" />
                  <span className="uppercase">{language}</span>
                  <ChevronDown size={16} className="ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('fr')}>
                  Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('ar')}>
                  العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link to="/cart" className="relative text-muted-foreground hover:text-primary">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {!currentUser ? (
              <>
                <Link to="/signin">
                  <Button variant="outline" size="sm" className="ml-2">{t('nav.login')}</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" size="sm" className="ml-2">{t('nav.signup')}</Button>
                </Link>
              </>
            ) : (
              <Button variant="outline" size="sm" className="ml-2" onClick={handleSignOut}>
                <LogOut size={16} className="mr-2" /> {t('account.logout')}
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-muted-foreground hover:text-primary"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar (expandable) */}
        {isSearchOpen && (
          <div className="py-3 border-t border-border animate-fade-in">
            <form className="relative">
              <input 
                type="text" 
                placeholder={t('product.search')}
                className="w-full py-2 pl-4 pr-10 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                aria-label="Submit search"
              >
                <Search size={18} className="text-muted-foreground" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="container-custom py-4">
            <ul className={`${language === 'ar' ? 'space-y-4 text-right' : 'space-y-4'}`}>
              <li>
                <Link 
                  to="/" 
                  className="block py-2 font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop" 
                  className="block py-2 font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.shop')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="block py-2 font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="block py-2 font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.contact')}
                </Link>
              </li>
              <div className="pt-2 border-t border-border">
                <li>
                  <Link 
                    to="/login" 
                    className="block py-2 font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/signup" 
                    className="block py-2 font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.signup')}
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
