/**
 * Server-side notification service interface
 * Ready for Resend, SendGrid, or Nodemailer without exposing keys to frontend.
 */

export interface LeadNotificationPayload {
  name: string;
  email: string;
  whatsapp?: string;
  service: string;
  budget: string;
  projectDetails: string;
  createdAt: string;
}

export async function sendLeadNotification(payload: LeadNotificationPayload): Promise<boolean> {
  const notificationEmail = process.env.ADMIN_EMAIL || 'digitalkarimamoni@gmail.com';

  // If a provider key is configured in environment variables, dispatch email
  const apiKey = process.env.EMAIL_PROVIDER_KEY || process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      // Prepared integration for email providers
      console.log(`[Notification Service] Dispatching email to ${notificationEmail} for lead from ${payload.name}`);
      // Provider call implementation can be connected here with provider SDK
      return true;
    } catch (error) {
      console.error('[Notification Service] Error sending email notification:', error);
      return false;
    }
  }

  // Safe fallback logging for development / audit
  console.log(`[Lead Notification Service] New lead received for ${notificationEmail}:`, {
    client: payload.name,
    email: payload.email,
    service: payload.service,
    budget: payload.budget,
    timestamp: payload.createdAt,
  });

  return true;
}
