/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorResponseData, SuccessResponseData } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

function RegisterVerificationPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your account, please wait...');

    const hasRequested = useRef(false);

    const email = searchParams.get('e');
    const token = searchParams.get('t');

    useEffect(() => {
        if (!email || !token || hasRequested.current) return;

        hasRequested.current = true;

        async function verifyAccount() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register-verification`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        token: token,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        accept: 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData: ErrorResponseData<any> = await response.json();
                    throw new Error(errorData.message || 'Verification failed');
                }

                const successData: SuccessResponseData<any> = await response.json();
                toast.success(successData.message || 'Account verified successfully!');
                setStatus('success');
                setMessage('Your account has been verified! Redirecting to login...');

                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } catch (err) {
                setStatus('error');
                if (err instanceof Error) {
                    toast.error(err.message);
                    setMessage(err.message);
                } else {
                    toast.error('An unexpected error occurred');
                    setMessage('An unexpected error occurred');
                }
            }
        }

        verifyAccount();
    }, [email, token, router]);

    if (!email || !token) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
                <Card className="w-full max-w-sm shadow-inner ring-1 ring-destructive/50">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-destructive">Invalid Link</CardTitle>
                        <CardDescription>The verification link is missing required parameters.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
            <Card className="w-full max-w-sm shadow-inner ring-1 ring-neutral-200 dark:ring-neutral-800">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-xl font-bold text-neutral-900 dark:text-neutral-50">Account Verification</CardTitle>
                    <CardDescription className="text-neutral-500 dark:text-neutral-400">{message}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pt-2 pb-6">
                    {status === 'loading' && <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />}
                    {status === 'success' && <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 flex items-center justify-center font-bold">✓</div>}
                    {status === 'error' && <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">✕</div>}
                </CardContent>
            </Card>
        </div>
    );
}

export default RegisterVerificationPage;
