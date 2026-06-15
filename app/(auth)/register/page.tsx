'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ErrorResponseData, SuccessResponseData } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

function RegisterPage() {
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        providerId: 'credentials',
        isLoading: false,
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        setInput(prev => ({
            ...prev,
            [id]: value,
        }));
    }

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setInput(old => ({ ...old, isLoading: true }));

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                body: JSON.stringify({
                    name: input.name,
                    email: input.email,
                    password: input.password,
                    providerId: input.providerId,
                }),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            });

            if (!response.ok) {
                const errorData: ErrorResponseData<{ name?: string[]; email?: string[]; password?: string[] }> = await response.json();
                throw new Error(errorData.message);
            }

            const successData: SuccessResponseData<{
                name: string;
                email: string;
                account: { userId: string; providerId: string };
                verificationUrl: string;
            }> = await response.json();

            setInput(old => ({ ...old, isLoading: false }));
            toast.success(successData.message);
        } catch (err) {
            setInput(old => ({ ...old, isLoading: false }));
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
            <Card className="w-full max-w-sm shadow-inner ring-1 ring-neutral-200 dark:ring-neutral-800">
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-between complex-header">
                        <CardTitle className="text-xl font-bold text-neutral-900 dark:text-neutral-50">Create an account</CardTitle>
                    </div>
                    <CardDescription className="text-neutral-500 dark:text-neutral-400">Enter your details below to create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister}>
                        <div className="flex flex-col gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="font-semibold text-neutral-800 dark:text-neutral-200">
                                    Full Name
                                </Label>
                                <Input id="name" type="text" placeholder="John Doe" required value={input.name} onChange={handleChange} disabled={input.isLoading} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email" className="font-semibold text-neutral-800 dark:text-neutral-200">
                                    Email
                                </Label>
                                <Input id="email" type="email" placeholder="m@example.com" required value={input.email} onChange={handleChange} disabled={input.isLoading} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password" className="font-semibold text-neutral-800 dark:text-neutral-200">
                                    Password
                                </Label>
                                <Input id="password" type="password" required value={input.password} onChange={handleChange} disabled={input.isLoading} />
                            </div>

                            <Button type="submit" className="w-full mt-2" disabled={input.isLoading}>
                                {input.isLoading ? 'Registering...' : 'Register'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <div className="flex items-center gap-1">
                        <p>Already Have Account?</p>
                        <Link href={'/login'}>Login</Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default RegisterPage;
