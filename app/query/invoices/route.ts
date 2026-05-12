import { fetchFilteredInvoices, fetchInvoicesPages } from '@app/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';

  try {
    const invoices = await fetchFilteredInvoices(query, Number(page));
    console.log('Fetched invoices:', invoices);
    const totalPages = await fetchInvoicesPages(query);

    return Response.json({ invoices, totalPages });
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}
