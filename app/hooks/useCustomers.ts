'use client';

import { useQuery } from '@tanstack/react-query';
import { CustomersTableType } from '@app/lib/definitions';

export function useCustomers(query: string = '') {
  console.log('🔵 useCustomers hook called with query:', query);
  return useQuery({
    queryKey: ['customers', query],
    queryFn: async () => {
      console.log(
        '🔵 useCustomers: Fetching from /query/customers?query=',
        query
      );
      const params = new URLSearchParams();
      if (query) params.append('query', query);

      const url = `/query/customers?${params.toString()}`;
      console.log('🔵 useCustomers: Full URL:', url);

      try {
        const res = await fetch(url);
        console.log(
          '🔵 useCustomers: Response status:',
          res.status,
          'OK:',
          res.ok
        );

        if (!res.ok) {
          const errorText = await res.text();
          console.error('🔴 useCustomers: Error response:', errorText);
          throw new Error(
            `Failed to fetch customers: ${res.status} ${errorText}`
          );
        }

        const data = await res.json();
        console.log('🔵 useCustomers: Data received:', data);
        return data.customers as CustomersTableType[];
      } catch (err) {
        console.error('🔴 useCustomers: Fetch error:', err);
        throw err;
      }
    },
    staleTime: 0, // Always refetch
    gcTime: 0, // Don't cache data in memory
  });
}
