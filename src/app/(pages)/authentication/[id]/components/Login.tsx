"use client";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import AuthForm from "./AuthForm";
import { useRouter, useSearchParams } from "next/navigation";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams!.get("callbackUrl") || "/dashboard";

  // Redirect to callbackUrl if already logged in
  useEffect(() => {
    if (session && status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [session, status, router, callbackUrl]);

  const loginFields = [
    {
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      label: "Email Address",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      },
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      label: "Password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      },
    },
  ];

  const handleLogin = async (data: any) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email.trim().toLowerCase(),
        password: data.password,
        callbackUrl,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        setSuccess("Login successful! Redirecting...");
        if (callbackUrl === "/register") {
          router.replace("/register");
        } else {
          router.replace("/dashboard");
        }
      }
    } catch (error: any) {
      setError(error?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      fields={loginFields}
      title="Welcome Back"
      description="Sign in to your account to continue"
      submitLabel="Sign In"
      loading={loading}
      handleSubmit={handleLogin}
      error={error}
      success={success}
      links={[
        {
          name: "Forgot your password?",
          href: "/authentication/forgot-password",
        },
        {
          name: "Don't have an account? Sign up",
          href: "/authentication/signup",
        },
      ]}
      disableAll={loading}
    />
  );
}
