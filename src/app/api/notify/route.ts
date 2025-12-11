import { NextResponse } from 'next/server';

// In a real application, you would use a robust email sending service
// like SendGrid, Mailgun, or AWS SES. For this MVP, we will simulate
// the email sending process by logging the email content to the console.

interface ValidationSummary {
  total: number;
  verified: number;
  mismatch: number;
  needs_review: number;
  not_found: number;
}

/**
 * Simulates sending an email to the administrator.
 */
async function sendAdminNotification(summary: ValidationSummary) {
  const adminEmail = "admin@example.com"; // Placeholder email
  const subject = "Provider Data Validation Report";
  
  const body = `
    Hello Administrator,

    A recent provider data validation cycle has completed. Here is the summary:

    - Total Providers Processed: ${summary.total}
    - Verified: ${summary.verified}
    - Mismatch: ${summary.mismatch}
    - Needs Review: ${summary.needs_review}
    - Not Found: ${summary.not_found}

    Please visit the dashboard to review the providers that require attention.

    Thank you,
    Provider Validation Agent
  `;

  // In a real implementation, this would be an API call to an email service.
  console.log("--- SIMULATING EMAIL ---");
  console.log(`To: ${adminEmail}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${body}`);
  console.log("------------------------");

  // Simulate a successful API call
  return { success: true };
}

/**
 * Handles POST requests to send a notification.
 */
export async function POST(request: Request) {
  try {
    const { validationResults } = await request.json();

    if (!validationResults || !Array.isArray(validationResults)) {
      return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
    }

    const summary: ValidationSummary = {
      total: validationResults.length,
      verified: validationResults.filter(p => p.validation_status === 'Verified').length,
      mismatch: validationResults.filter(p => p.validation_status === 'Mismatch').length,
      needs_review: validationResults.filter(p => p.validation_status === 'Needs Review').length,
      not_found: validationResults.filter(p => p.validation_status === 'Not Found').length,
    };

    const emailResponse = await sendAdminNotification(summary);

    if (emailResponse.success) {
      return NextResponse.json({ message: 'Notification sent successfully.' });
    } else {
      throw new Error('Failed to send notification.');
    }

  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json({ message: 'Failed to send notification' }, { status: 500 });
  }
}
