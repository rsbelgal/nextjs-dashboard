import CustomersTable from '@app/ui/customers/table';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <Suspense fallback={<div>Loading customers...</div>}>
        <CustomersTable />
      </Suspense>
    </main>
  );
}
