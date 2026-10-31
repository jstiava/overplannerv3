
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white">
            <span className="text-sm font-medium tracking-widest uppercase text-gray-400">
                Error 404
            </span>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900">
                Something went wrong.
            </h1>

            <p className="mt-3 max-w-md text-gray-500">
                We couldn&apos;t find the page you&apos;re looking for. It may have been
                moved, deleted, or the address may be incorrect.
            </p>

            <Link
                href="/"
                className="mt-8 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
            >
                Return home
            </Link>
        </main>
    );
}
