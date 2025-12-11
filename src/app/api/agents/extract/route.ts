import { NextRequest, NextResponse } from 'next/server';
import { nvidiaClient } from '@/lib/nvidia-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, type } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'Text content required' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert at extracting healthcare provider information from documents.
    Extract all relevant provider details including names, specialties, contact information, 
    licenses, and credentials. Return the data in a structured JSON format.`;

    const userPrompt = `Extract provider information from this ${type || 'document'}:
    
    ${text}
    
    Return JSON array of providers with structure:
    [{
      "name": string,
      "specialty": string[],
      "phone": string,
      "address": string,
      "email": string,
      "npi": string,
      "license": string
    }]`;

    const response = await nvidiaClient.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ], 0.1);

    let extractedData;
    try {
      extractedData = JSON.parse(response);
    } catch {
      extractedData = { raw_response: response };
    }

    return NextResponse.json({
      success: true,
      data: extractedData
    });
  } catch (error: any) {
    console.error('Extraction error:', error);
    return NextResponse.json(
      { error: error.message || 'Extraction failed' },
      { status: 500 }
    );
  }
}
