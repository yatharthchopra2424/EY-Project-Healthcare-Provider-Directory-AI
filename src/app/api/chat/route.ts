import { NextRequest, NextResponse } from 'next/server';
import { nvidiaClient } from '@/lib/nvidia-client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, temperature } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array required' },
        { status: 400 }
      );
    }

    const response = await nvidiaClient.chat(messages, temperature || 0.7);

    return NextResponse.json({
      success: true,
      response
    });
  } catch (error: any) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: error.message || 'Chat failed' },
      { status: 500 }
    );
  }
}
