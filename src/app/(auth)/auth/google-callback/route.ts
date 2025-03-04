import { handleGoogleCallback } from '@/lib/auth-actions';

export async function GET() {
    return handleGoogleCallback();
}