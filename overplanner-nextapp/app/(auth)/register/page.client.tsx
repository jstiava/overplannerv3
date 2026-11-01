'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Popover } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useDataStore from "@/components/useDataStore";
import { authClient } from "@/lib/auth-client";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DataStoreType = {
    email: string,
    password: string,
    reenteredPassword: string,
    name: string,
    image?: string | null
};

export default function RegisterClientPage() {

    const router = useRouter();
    const Data = useDataStore<DataStoreType | null>(null);
    const [progress, setProgress] = useState('entry');
    const [showPassword, setShowPassword] = useState(false);
    const [submittedOnce, setSubmittedOnce] = useState(false);

    const isNameError = submittedOnce && !Data.data?.name;
    const isEmailError = submittedOnce && !Data.data?.email;
    const isPasswordError = submittedOnce && !Data.data?.password;
    const isReenterPasswordError = submittedOnce && (!Data.data?.reenteredPassword || !Data.data?.password || (Data.data.password != Data.data.reenteredPassword));



    const handleRegister = async (props: DataStoreType | null) => {
        console.log(Data.data);

        if (!props) {
            alert("No data provided")
            return;
        }


        if ([isNameError, isEmailError, isPasswordError, isReenterPasswordError].some(Boolean)) {
            return;
        }

        const { data, error } = await authClient.signUp.email({
            email: props.email, // user email address
            password: props.password, // user password -> min 8 characters by default
            name: props.name, // user display name
            image: props.image ?? undefined, // User image URL (optional)
            callbackURL: "/dashboard" // A URL to redirect to after the user verifies their email (optional)
        }, {
            onRequest: (ctx) => {
                //show loading
                setProgress('loading')
            },
            onSuccess: (ctx) => {
                //redirect to the dashboard or sign in page
                setProgress('submitted');
                router.push('/check-your-email');
            },
            onError: (ctx) => {
                // display the error message
                alert(ctx.error.message);
            },
        });

    }



    return (
        <main className="flex min-h-screen w-full items-center justify-center p-6">
            <div className="w-full max-w-sm space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your details to get started.
                    </p>
                </div>

                <form onSubmit={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRegister(Data.data);
                }} className="space-y-4">
                    <div className="space-y-0">
                        <label htmlFor="name" className="text-sm font-medium">Name<span className="required text-[red]">*</span></label>
                        <Input
                            {...{
                                id: 'name',
                                type: 'text',
                                name: "name",
                                autoComplete: "name",
                                "aria-invalid": isNameError,
                                required: true,
                                value: Data.data?.name ?? "",
                                onChange: Data.handleChangeData,
                                className: "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring h-10"
                            }}
                        />
                        {isNameError && <span className="text-xs text-red-400">Name required</span>}
                    </div>

                    <div className="space-y-0">
                        <label htmlFor="email" className="text-sm font-medium">Email<span className="required text-[red]">*</span></label>
                        <Input
                            {...{
                                id: 'email',
                                type: 'email',
                                name: "email",
                                autoComplete: "email",
                                "aria-invalid": isEmailError,
                                required: true,
                                minLength: 8,
                                value: Data.data?.email ?? "",
                                onChange: Data.handleChangeData,
                                className: "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring h-10"
                            }}
                        />
                        {isEmailError && <span className="text-xs text-red-400">Email required</span>}
                    </div>

                    <div className="space-y-0">
                        <label htmlFor="password" className="text-sm font-medium">Password<span className="required text-[red]">*</span></label>
                        <div className="flex gap-2 relative items-center">
                            <InputGroup {...{
                                className: 'h-10'
                            }}>

                                <InputGroupInput
                                    {...{
                                        id: 'password',
                                        type: showPassword ? "text" : "password",
                                        name: "password",
                                        autoComplete: "new-password",
                                        "aria-invalid": isPasswordError,
                                        required: true,
                                        minLength: 8,
                                        value: Data.data?.password ?? "",
                                        onChange: Data.handleChangeData,

                                    }}
                                />
                                <InputGroupAddon {...{
                                    align: "inline-end"
                                }}>
                                    <Tooltip>
                                        <TooltipTrigger render={
                                            <Button
                                                {...{
                                                    type: "button",
                                                    variant: 'ghost',
                                                    size: "icon",
                                                    onClick: e => {
                                                        setShowPassword(prev => !prev)
                                                    },
                                                    // className: "absolute right-0 top-0 h-full",
                                                    "aria-label": showPassword ? "Hide password" : "Show password"
                                                }}
                                            >
                                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                            </Button>
                                        } />
                                        <TooltipContent><p>{showPassword ? "Hide password" : "Show password"}</p></TooltipContent>
                                    </Tooltip></InputGroupAddon>
                            </InputGroup>
                        </div>
                        {isPasswordError && <span className="text-xs text-red-400">Password required</span>}

                    </div>

                    <div className="space-y-0">
                        <label htmlFor="reenteredPassword" className="text-sm font-medium">Re-enter password<span className="required text-[red]">*</span></label>
                        <div className="relative flex gap-2 items-center ">
                            <InputGroup {...{
                                className: 'h-10'
                            }}>

                                <InputGroupInput
                                    {...{
                                        id: 'reenteredPassword',
                                        type: showPassword ? "text" : "password",
                                        name: "reenteredPassword",
                                        autoComplete: "new-password",
                                        "aria-invalid": isReenterPasswordError,
                                        required: true,
                                        minLength: 8,
                                        value: Data.data?.reenteredPassword ?? "",
                                        onChange: Data.handleChangeData,

                                    }}
                                />
                                <InputGroupAddon {...{
                                    align: "inline-end"
                                }}>
                                    <Tooltip>
                                        <TooltipTrigger render={
                                            <Button
                                                {...{
                                                    type: "button",
                                                    variant: 'ghost',
                                                    size: "icon",
                                                    onClick: e => {
                                                        setShowPassword(prev => !prev)
                                                    },
                                                    // className: "absolute right-0 top-0 h-full",
                                                    "aria-label": showPassword ? "Hide password" : "Show password"
                                                }}
                                            >
                                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                            </Button>
                                        } />
                                        <TooltipContent><p>{showPassword ? "Hide password" : "Show password"}</p></TooltipContent>
                                    </Tooltip></InputGroupAddon>
                            </InputGroup>
                        </div>
                        {isReenterPasswordError && <span className="text-xs text-red-400">Does not match</span>}

                    </div>


                    {/* 
                    {error && (
                        <p role="alert" className="text-sm text-destructive">{error}</p>
                    )} */}


                    <Button {...{
                        type: "submit",
                        disabled: progress != 'entry',
                        className: "w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50 h-10",
                        onClick: e => {
                            setSubmittedOnce(true);
                        }
                    }}>
                        {progress == 'loading' ? "Creating account..." : "Create account"}
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-foreground underline underline-offset-4">
                        Sign in
                    </Link>
                </p>

                <p className="debug">{JSON.stringify(Data.data, null, 2)}</p>
            </div>
        </main>
    )
}