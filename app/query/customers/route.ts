import { fetchFilteredCustomers, fetchInvoicesPages } from '@app/lib/data';

export async function GET(request: Request) {
  console.log('🟢 API route /query/customers GET called');
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  console.log('🟢 Query parameter:', query);

  try {
    const customers = await fetchFilteredCustomers(query);
    console.log('🟢 Fetched customers:', customers.length, 'records');
    return Response.json({ customers });
  } catch (error) {
    console.error('🔴 Error in /query/customers route:', error);
    return Response.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}
