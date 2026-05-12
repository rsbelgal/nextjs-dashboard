'use client';

import { ReactNode } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-gray-700 mb-4">
          Something went wrong. Please try again.
        </p>
        <details className="mb-4 p-3 bg-gray-100 rounded text-sm">
          <summary className="cursor-pointer font-semibold text-gray-600">
            Error details
          </summary>
          <pre className="mt-2 text-xs overflow-auto text-red-600">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </details>
        <button
          onClick={resetErrorBoundary}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export function AppErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset app state here if needed
        window.location.href = '/';
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
