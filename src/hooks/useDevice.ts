import { useState, useEffect, useCallback } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  screenWidth: number;
  screenHeight: number;
}

/**
 * Custom hook for responsive device detection
 * Provides consistent device information across the app
 */
export const useDevice = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => getDeviceInfo());

  function getDeviceInfo(): DeviceInfo {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isTouchDevice: false,
        screenWidth: 1920,
        screenHeight: 1080,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const userAgent = navigator.userAgent;

    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
    const isMobile = width <= 768 || isMobileUA;
    const isTablet = width > 768 && width <= 1024;
    const isDesktop = width > 1024;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    return {
      isMobile,
      isTablet,
      isDesktop,
      isTouchDevice,
      screenWidth: width,
      screenHeight: height,
    };
  }

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDeviceInfo(getDeviceInfo());
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return deviceInfo;
};

/**
 * Custom hook for handling scroll position
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { scrollPosition, scrollDirection };
};

/**
 * Custom hook for detecting if element is in viewport
 */
export const useInView = (
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
        ...options,
      }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return isInView;
};

/**
 * Custom hook for debounced value
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Custom hook for local storage with SSR support
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value;
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        return valueToStore;
      });
    },
    [key]
  );

  return [storedValue, setValue];
};

/**
 * Custom hook for media query
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

/**
 * Custom hook for preferred color scheme
 */
export const usePrefersDarkMode = (): boolean => {
  return useMediaQuery('(prefers-color-scheme: dark)');
};

/**
 * Custom hook for reduced motion preference
 */
export const usePrefersReducedMotion = (): boolean => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};
