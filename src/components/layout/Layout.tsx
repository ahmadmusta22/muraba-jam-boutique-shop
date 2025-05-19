import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Check if script already exists
    if (document.querySelector('script[src*="getbutton.io"]')) {
      console.log('GetButton script already exists');
      return;
    }

    console.log('Initializing GetButton...');
    
    // Add GetButton script using their official installation method
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://getbutton.io/widget.js';
    script.setAttribute('data-widget-id', 'YOUR_WIDGET_ID'); // Replace with your widget ID
    script.setAttribute('data-button-color', '#1877F3');
    script.setAttribute('data-button-text', 'Chat with us');
    script.setAttribute('data-button-position', 'bottom-right');
    script.setAttribute('data-button-style', 'classic');
    script.setAttribute('data-button-icon', 'classic');
    script.setAttribute('data-button-animation', 'pulse');
    script.setAttribute('data-button-border', 'true');
    script.setAttribute('data-button-notification', 'true');
    script.setAttribute('data-button-background-style', 'solid');
    script.setAttribute('data-button-size', 'medium');
    script.setAttribute('data-button-border-radius', '50%');
    script.setAttribute('data-button-shadow', 'true');
    script.setAttribute('data-button-opacity', '1');
    script.setAttribute('data-button-shift', '0');
    script.setAttribute('data-button-display', 'both');
    script.setAttribute('data-button-show-on', 'all');
    script.setAttribute('data-button-greeting', 'true');
    script.setAttribute('data-button-greeting-text', 'Hello! How can we help you?');
    script.setAttribute('data-button-greeting-delay', '0');
    script.setAttribute('data-button-greeting-type', 'modern');
    script.setAttribute('data-button-greeting-position', 'bottom');
    script.setAttribute('data-button-greeting-mirror', 'false');
    script.setAttribute('data-button-greeting-avatar', '');
    script.setAttribute('data-button-greeting-agent-name', 'Support');
    script.setAttribute('data-button-greeting-agent-position', 'Customer Support');
    script.setAttribute('data-button-greeting-message', 'true');
    script.setAttribute('data-button-greeting-call-to-action', 'true');
    script.setAttribute('data-button-greeting-google-analytics', 'true');
    
    // Add error handling
    script.onerror = (error) => {
      console.error('Error loading GetButton script:', error);
    };
    
    // Add load handling
    script.onload = () => {
      console.log('GetButton script loaded successfully');
    };
    
    // Add the script to the document head instead of body
    document.head.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      const existingScript = document.querySelector('script[src*="getbutton.io"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
        console.log('GetButton script removed');
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
