'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, ReactNode, useState, Suspense } from 'react';

// Lazy load DevTools only in development
const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then(mod => ({
    default: mod.ReactQueryDevtools,
  }))
);

export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
            retry: 1,
            refetchOnWindowFocus: true,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <Suspense fallback={null}>
          <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
      )}
    </QueryClientProvider>
  );
}
