import { NextResponse } from 'next/server';

const NPI_API_URL = 'https://npiregistry.cms.hhs.gov/api/';

async function queryNpiRegistry(provider: any) {
  const npiNumber = provider.npi_number || provider.NPI;
  const params = new URLSearchParams({
    version: '2.1',
    limit: '10',
    ...(npiNumber ? { number: npiNumber } : {
      first_name: provider.first_name || '',
      last_name: provider.last_name || '',
      city: provider.city || '',
      state: provider.state || '',
    })
  });

  const response = await fetch(`${NPI_API_URL}?${params.toString()}`);
  return response.json();
}

function getValidationStatus(originalProvider: any, npiResult: any) {
  if (npiResult.Errors || !npiResult.results || npiResult.result_count === 0) {
    return { status: 'Not Found', npi_data: npiResult.Errors || null };
  }

  if (npiResult.result_count > 1) {
    return { status: 'Needs Review', npi_data: npiResult.results };
  }

  return { status: 'Verified', npi_data: npiResult.results[0] };
}

export async function POST(request: Request) {
  try {
    const { providers } = await request.json();

    if (!providers || !Array.isArray(providers)) {
      return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
    }

    const validationPromises = providers.map(async (provider) => {
      const npiResult = await queryNpiRegistry(provider);
      const { status, npi_data } = getValidationStatus(provider, npiResult);
      return { ...provider, validation_status: status, npi_data };
    });

    const validationResults = await Promise.all(validationPromises);

    return NextResponse.json({ results: validationResults });
  } catch (error) {
    console.error('Error during validation:', error);
    return NextResponse.json({ message: 'Failed to perform validation' }, { status: 500 });
  }
}
