import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// Helper function to check if code is running in browser
const isBrowser = typeof window !== 'undefined';

const PerformanceOptimizer: React.FC = () => {
  // Preconnect to external domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://via.placeholder.com', // If you're using placeholder images
  ];

  // Function to lazy load images
  useEffect(() => {
    // Only run in browser environment
    if (!isBrowser) return;

    // If IntersectionObserver is available (modern browsers)
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[data-src]');

      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement;
            if (lazyImage.dataset.src) {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.removeAttribute('data-src');
              imageObserver.unobserve(lazyImage);
            }
          }
        });
      });

      lazyImages.forEach((image) => {
        imageObserver.observe(image);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      const lazyLoad = () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach((img: Element) => {
          const imgElement = img as HTMLImageElement;
          if (imgElement.dataset.src) {
            imgElement.src = imgElement.dataset.src;
            imgElement.removeAttribute('data-src');
          }
        });
      };

      // Initial load
      lazyLoad();

      // Add scroll event with throttling
      let scrollTimeout: ReturnType<typeof setTimeout>;
      const handleScroll = () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(lazyLoad, 200);
      };

      // TypeScript-safe event listeners with explicit cast
      const win = window as Window;
      win.addEventListener('scroll', handleScroll);
      win.addEventListener('resize', handleScroll);

      return () => {
        win.removeEventListener('scroll', handleScroll);
        win.removeEventListener('resize', handleScroll);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      };
    }
  }, []);

  // Don't render anything on the server
  if (!isBrowser) {
    return null;
  }

  return (
    <Helmet>
      {/* Preconnect to important domains */}
      {preconnectDomains.map((domain, index) => (
        <link key={index} rel="preconnect" href={domain} />
      ))}

      {/* Font display optimization */}
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap"
      />

      {/* Resource hints */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

      {/* Prefetch important pages */}
      <link rel="prefetch" href="/blog" />

      {/* Core web vital optimizations */}
      <style type="text/css">{`
        /* Prevent layout shifts by setting explicit image dimensions */
        img {
          max-width: 100%;
          height: auto;
          aspect-ratio: attr(width) / attr(height);
        }
        
        /* Ensure text remains visible during webfont load */
        html {
          font-display: swap;
        }
      `}</style>
    </Helmet>
  );
};

export default PerformanceOptimizer;
