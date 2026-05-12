'use client';

import { useQuery } from '@tanstack/react-query';
import { InvoicesTable } from '@app/lib/definitions';

interface UseInvoicesResponse {
  invoices: InvoicesTable[];
  totalPages: number;
}

export function useInvoices(query: string = '', page: number = 1) {
  console.log('🔵 useInvoices hook called with query:', query, 'page:', page);
  return useQuery({
    queryKey: ['invoices', query, page],
    queryFn: async () => {
      console.log('🔵 useInvoices: Fetching with query:', query, 'page:', page);
      const params = new URLSearchParams();
      if (query) params.append('query', query);
      params.append('page', String(page));

      const url = `/query/invoices?${params.toString()}`;
      console.log('🔵 useInvoices: Fetching from:', url);

      const res = await fetch(url);
      console.log('🔵 useInvoices: Response status:', res.status);
      if (!res.ok) throw new Error('Failed to fetch invoices');

      const data = (await res.json()) as UseInvoicesResponse;
      console.log('🔵 useInvoices: Data received:', data);
      return data;
    },
    staleTime: 0, // Always refetch
    gcTime: 0, // Don't cache data in memory
  });
}
