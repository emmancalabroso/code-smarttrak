"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AUTH_SESSION_KEY,
  AUTH_STORAGE_KEY,
  DEFAULT_CREDENTIALS,
  type StoredUser,
} from "../lib/auth";

export default function HomePage() {
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");

  function getStoredUser(): StoredUser {
    const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!storedUser) {
      return DEFAULT_CREDENTIALS;
    }

    try {
      return JSON.parse(storedUser) as StoredUser;
    } catch {
      return DEFAULT_CREDENTIALS;
    }
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError("Please enter both your email address and password.");
      return;
    }

    const savedUser = getStoredUser();

    if (
      loginEmail.trim().toLowerCase() !== savedUser.email.toLowerCase() ||
      loginPassword !== savedUser.password
    ) {
      setLoginError("Incorrect email or password. Please try again.");
      return;
    }

    window.sessionStorage.setItem(AUTH_SESSION_KEY, savedUser.email);
    router.push("/success");
  }

  function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSignUpMessage("");
    setLoginError("");

    if (!signUpEmail.trim() || !signUpPassword.trim()) {
      setSignUpMessage("Please provide an email address and password to sign up.");
      return;
    }

    const newUser = {
      email: signUpEmail.trim(),
      password: signUpPassword,
    };

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    setSignUpMessage("Account created. You can now log in with your new credentials.");
    setLoginEmail(newUser.email);
    setLoginPassword("");
    setSignUpPassword("");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-2xl backdrop-blur md:grid-cols-2">
        <div className="bg-orange-600 px-8 py-10 text-white sm:px-10 sm:py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-100">
            SmartTrak
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Sign up or log in with your email.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-orange-50 sm:text-lg">
            A simple authentication screen for getting users into the app with an
            email address and password.
          </p>
          <div className="mt-10 space-y-4">
            <div className="rounded-2xl border border-orange-400 bg-orange-500/40 px-4 py-4">
              Secure email and password fields
            </div>
            <div className="rounded-2xl border border-orange-400 bg-orange-500/40 px-4 py-4">
              Separate forms for returning and new users
            </div>
            <div className="rounded-2xl border border-orange-400 bg-orange-500/40 px-4 py-4">
              Ready to connect to backend auth endpoints
            </div>
          </div>
        </div>

        <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-stone-200 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-stone-500">
                    Log In
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900">
                    Access your account
                  </h2>
                </div>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
                  Returning
                </span>
              </div>

              <form className="mt-8 space-y-5" onSubmit={handleLogin}>
                <label className="block">
                  <span className="text-sm font-medium text-stone-700">Email address</span>
                  <input
                    type="email"
                    name="login-email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(event) => setLoginEmail(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-base text-stone-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-stone-700">Password</span>
                  <input
                    type="password"
                    name="login-password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-base text-stone-900 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </label>

                {loginError ? (
                  <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {loginError}
                  </p>
                ) : (
                  <p className="text-sm text-stone-500">
                    Use your saved credentials, or sign up first to create them.
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-stone-800"
                >
                  Log In
                </button>
              </form>
            </article>

            <article className="rounded-3xl border border-orange-200 bg-orange-50 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-orange-600">
                    Sign Up
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900">
                    Create a new profile
                  </h2>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700 ring-1 ring-orange-200">
                  New Here
                </span>
              </div>

              <form className="mt-8 space-y-5" onSubmit={handleSignUp}>
                <label className="block">
                  <span className="text-sm font-medium text-stone-700">Email address</span>
                  <input
                    type="email"
                    name="signup-email"
                    placeholder="you@example.com"
                    value={signUpEmail}
                    onChange={(event) => setSignUpEmail(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-base text-stone-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-stone-700">Password</span>
                  <input
                    type="password"
                    name="signup-password"
                    placeholder="Create a password"
                    value={signUpPassword}
                    onChange={(event) => setSignUpPassword(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-base text-stone-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </label>

                {signUpMessage ? (
                  <p className="rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm text-orange-700">
                    {signUpMessage}
                  </p>
                ) : (
                  <p className="text-sm text-stone-500">
                    A demo login is also available with `demo@smarttrak.app` and
                    `password123`.
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-orange-600 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-orange-500"
                >
                  Sign Up
                </button>
              </form>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
