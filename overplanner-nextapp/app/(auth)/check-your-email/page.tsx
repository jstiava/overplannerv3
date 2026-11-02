import { Button } from "@/components/ui/button";
import { CheckCircle2Icon, MailIcon } from "lucide-react";
import Link from "next/link";



export default async function CheckYourEmailPage() {

    return (
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center p-6 text-center">
            <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10">
                <MailIcon className="size-8 text-primary" />
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">
                Check your email
            </h1>

            <p className="mt-3 text-muted-foreground">
                We&apos;ve sent you an activation link. Open the email and follow the
                instructions to activate your account.
            </p>

            {/* {email && (
        <div className="mt-5 rounded-lg border bg-muted/40 px-4 py-3">
          <p className="font-medium">{email}</p>
        </div>
      )} */}

            <div className="mt-5 flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2Icon className="size-4" />
                Verification email sent.
            </div>

            <div className="mt-8 flex w-full flex-col gap-3">
                {/* <Button
          onClick={resendEmail}
          disabled={!email || loading}
          variant="outline"
          className="w-full"
        >
          {loading ? 'Sending...' : 'Resend verification email'}
        </Button> */}

                <Button className="w-full" render={(
                    <Link href="/login">Return to sign in</Link>
                )} />
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
                Didn&apos;t receive the email? Check your spam folder or try resending it.
            </p>
        </div>
    );
}