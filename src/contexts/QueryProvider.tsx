import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSupabaseRealtime } from '../hooks/useSupabaseRealtime';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30, // 30 seconds fresh data (reduced from 5 minutes for rapid responsiveness)
      gcTime: 1000 * 60 * 30, // 30 minutes in memory cache
      refetchOnWindowFocus: true, // Auto-refetch when user returns to website tab after editing in Studio
      retry: 1,
    },
  },
});

const RealtimeListener: React.FC = () => {
  useSupabaseRealtime();
  return null;
};

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RealtimeListener />
      {children}
    </QueryClientProvider>
  );
};
