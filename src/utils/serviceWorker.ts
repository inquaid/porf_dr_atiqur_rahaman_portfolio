// Service Worker Registration
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | undefined> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available
              // eslint-disable-next-line no-console
              console.info('New content is available; please refresh.');
              // Optionally show a notification to the user
              if (window.confirm('New version available! Click OK to refresh.')) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
              }
            }
          });
        }
      });

      // eslint-disable-next-line no-console
      console.info('Service Worker registered successfully:', registration.scope);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
  return undefined;
};

export const unregisterServiceWorker = async (): Promise<boolean> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const result = await registration.unregister();
      // eslint-disable-next-line no-console
      console.info('Service Worker unregistered:', result);
      return result;
    } catch (error) {
      console.error('Service Worker unregistration failed:', error);
    }
  }
  return false;
};
