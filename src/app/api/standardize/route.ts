import { NextResponse } from 'next/server';
import axios from 'axios';

const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;

if (!NVIDIA_API_KEY) {
  throw new Error("NVIDIA_API_KEY is not defined in the environment variables.");
}

const headers = {
  "Authorization": `Bearer ${NVIDIA_API_KEY}`,
  "Accept": "application/json",
};

async function getStandardizedSpecialty(specialty: string): Promise<string> {
  if (!specialty || specialty.trim() === '') return '';

  const prompt = `Standardize the following medical specialty into a single, common term (e.g., "Cardiology", "Pediatrics"). Original: "${specialty}" Standardized:`;
  const payload = {
    "model": "mistralai/mistral-large-3-675b-instruct-2512",
    "messages": [{"role": "user", "content": prompt}],
    "max_tokens": 20, "temperature": 0.2, "stream": false,
  };

  try {
    const response = await axios.post(invokeUrl, payload, { headers });
    return response.data.choices[0].message.content.split('Standardized:').pop()?.trim().replace(/"/g, '') || specialty;
  } catch (error) {
    console.error(`Error standardizing specialty "${specialty}":`, error);
    return specialty;
  }
}

export async function POST(request: Request) {
  try {
    const { providers } = await request.json();

    if (!providers || !Array.isArray(providers)) {
      return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
    }

    const standardizationPromises = providers.map(async (provider) => {
      const originalSpecialty = provider.specialty || provider.primary_specialty || '';
      const standardizedSpecialty = await getStandardizedSpecialty(originalSpecialty);
      return { ...provider, specialty: standardizedSpecialty };
    });

    const standardizedProviders = await Promise.all(standardizationPromises);

    return NextResponse.json({ results: standardizedProviders });
  } catch (error) {
    console.error('Error during data standardization:', error);
    return NextResponse.json({ message: 'Failed to standardize data' }, { status: 500 });
  }
}
