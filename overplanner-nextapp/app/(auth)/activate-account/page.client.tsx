'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

type Status = 'loading' | 'success' | 'error'

export default function ActivateAccountClientPage({token}: {
    token?: string | null
}) {
    const attempted = useRef(false)

    const [status, setStatus] = useState<Status>('loading')
    const [message, setMessage] = useState('Verifying your activation link...')

    useEffect(() => {
        if (attempted.current) return
        attempted.current = true

        if (!token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStatus('error')
            setMessage('Your activation link is missing its token.')
            return
        }

        const verify = async () => {
            try {
                const result = await authClient.verifyEmail({
                    query: { token },
                })

                if (result.error) {
                    setStatus('error')
                    setMessage(
                        result.error.message || 'This activation link is invalid or has expired.'
                    )
                    return
                }

                setStatus('success')
                setMessage('Your account has been successfully activated.')
            } catch {
                setStatus('error')
                setMessage('Unable to activate your account. Please try again.')
            }
        }

        verify()
    }, [token])

    return (
        <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center p-6 text-center">
            <h1 className="text-2xl font-semibold">
                {status === 'loading'
                    ? 'Activating account'
                    : status === 'success'
                        ? 'Account activated'
                        : 'Activation failed'}
            </h1>

            <p className="mt-3 text-muted-foreground">{message}</p>

            {status === 'loading' && (
                <div className="mt-6 animate-spin size-6 rounded-full border-2 border-primary border-t-transparent" />
            )}

            {status !== 'loading' && (
                <Button className="mt-6" render={<Link href="/login">
                    {status === 'success' ? 'Sign in' : 'Return to sign in'}
                </Link>} />
            )}
        </div>
    )
}