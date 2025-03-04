import { handleGoogleCallback } from '@/lib/auth-actions';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    return handleGoogleCallback();
}