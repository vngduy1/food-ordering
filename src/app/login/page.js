"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoginInProgress(true);

    await signIn("credentials", { email, password, callbackUrl: "/" });

    setLoginInProgress(false);
  };

  return (
    <section className="mt-8 min-h-[60vh]">
      <h1 className="text-center text-primary text-4xl ">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          disabled={loginInProgress}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          disabled={loginInProgress}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loginInProgress} type="submit">
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image src={"/google.png"} alt="google" width={24} height={24} />{" "}
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          New to Accounts?{" "}
          <Link className="underline" href={"/register"}>
            Sign Up &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
