import { NextResponse } from 'next/server';
import { providerStore } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!Array.isArray(data)) {
      return NextResponse.json({ message: 'Invalid data format.' }, { status: 400 });
    }
    providerStore.setProviders(data);
    return NextResponse.json({ message: 'Data uploaded successfully', count: providerStore.getProviders().length });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to process request' }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json(providerStore.getProviders());
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 });
  }
}
