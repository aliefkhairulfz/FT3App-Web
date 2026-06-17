'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ErrorResponseData, SuccessResponseData } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

function LoginPage() {
    const [input, setInput] = useState({
        email: '',
        password: '',
        providerId: 'credentials',
        isLoading: false,
    });

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setInput(old => ({ ...old, isLoading: true }));

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    email: input.email,
                    password: input.password,
                    providerId: input.providerId,
                }),
                credentials: 'include',
                headers: { 'Content-Type': 'application/json', accept: 'application/json' },
            });

            if (!response.ok) {
                const errorData: ErrorResponseData<{ email: string[]; password: string[] }> = await response.json();
                throw new Error(errorData.message);
            }

            const successData: SuccessResponseData<{ email: string; sessionToken: string }> = await response.json();
            setInput(old => ({ ...old, isLoading: false }));
            toast.success(successData.message);
        } catch (err) {
            if (err instanceof Error) toast.error(err.message);
            setInput(old => ({ ...old, isLoading: false }));
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
            <Card className="w-full max-w-sm shadow-inner ring-1 ring-neutral-200 dark:ring-neutral-800">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-between complex-header">
                        <CardTitle className="text-xl font-bold text-neutral-900 dark:text-neutral-50">Login to your account</CardTitle>
                    </div>
                    <CardDescription className="text-neutral-500 dark:text-neutral-400">Enter your email below to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Handler dipindahkan ke onSubmit form */}
                    <form onSubmit={handleLogin}>
                        <div className="flex flex-col gap-4">
                            {/* Email Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="font-semibold text-neutral-800 dark:text-neutral-200">
                                    Email
                                </Label>
                                <Input
                                    value={input.email}
                                    onChange={e => setInput(old => ({ ...old, email: e.target.value }))}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    disabled={input.isLoading}
                                />
                            </div>

                            {/* Password Field */}
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="font-semibold text-neutral-800 dark:text-neutral-200">
                                        Password
                                    </Label>
                                </div>
                                <Input
                                    value={input.password}
                                    onChange={e => setInput(old => ({ ...old, password: e.target.value }))}
                                    id="password"
                                    type="password"
                                    required
                                    disabled={input.isLoading}
                                />
                            </div>

                            {/* Tombol utama sekarang ada di dalam form dengan type="submit" */}
                            <Button type="submit" className="w-full mt-2" disabled={input.isLoading}>
                                {input.isLoading ? 'Logging in...' : 'Login'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <div className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <p>Don&apos;t have an account?</p>
                        <Link href="/register">Register</Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default LoginPage;
