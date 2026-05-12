'use client';

import { ReactNode } from 'react';
import { QueryProvider } from '@app/providers/query-provider';
import { AppErrorBoundary } from '@app/providers/error-boundary';

/**
 * Root providers wrapper that combines all application-level providers
 * Wraps the entire app with error boundary, query client, and other providers
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppErrorBoundary>
      <QueryProvider>
        {children}
      </QueryProvider>
    </AppErrorBoundary>
  );
}
