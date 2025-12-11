import { NextRequest, NextResponse } from 'next/server';
import { DirectoryManagementAgent } from '@/lib/agents';
import { Provider } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { provider, issues } = body;

    if (!provider || !issues) {
      return NextResponse.json(
        { error: 'Provider and issues required' },
        { status: 400 }
      );
    }

    const agent = new DirectoryManagementAgent();
    const email = await agent.generateCommunicationEmail(provider, issues);

    return NextResponse.json({
      success: true,
      email
    });
  } catch (error: any) {
    console.error('Email generation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate email' },
      { status: 500 }
    );
  }
}
