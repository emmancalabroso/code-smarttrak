"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AUTH_SESSION_KEY } from "../../lib/auth";

export default function SuccessPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const sessionEmail = window.sessionStorage.getItem(AUTH_SESSION_KEY);

    if (!sessionEmail) {
      router.replace("/");
      return;
    }

    setEmail(sessionEmail);
  }, [router]);

  function handleLogout() {
    window.sessionStorage.removeItem(AUTH_SESSION_KEY);
    router.push("/");
  }

  if (email === null) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-12">
        <section className="w-full max-w-2xl rounded-3xl border border-white/60 bg-white/85 p-8 shadow-2xl backdrop-blur sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            SmartTrak
          </p>
          <p className="mt-6 text-base text-stone-600">Checking your session...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-2xl rounded-3xl border border-white/60 bg-white/85 p-8 shadow-2xl backdrop-blur sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            SmartTrak
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-2xl bg-stone-900 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-stone-800"
          >
            Log Out
          </button>
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
          Login successful
        </h1>
        <p className="mt-6 text-lg leading-8 text-stone-700">
          You are signed in as <span className="font-semibold text-stone-900">{email}</span>.
        </p>
        <p className="mt-3 text-base leading-7 text-stone-600">
          This is your simple post-login page. You can keep building from here or head
          back to the auth screen anytime.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-2xl border border-orange-200 bg-orange-50 px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-orange-700 transition hover:bg-orange-100"
          >
            Back To Login
          </Link>
        </div>
      </section>
    </main>
  );
}
