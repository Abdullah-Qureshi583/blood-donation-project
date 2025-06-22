"use client";
import { useState } from "react";
import AuthForm from "./AuthForm";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const signupFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Enter your full name",
      label: "Full Name",
      validation: {
        required: "Full name is required",
        minLength: {
          value: 2,
          message: "Name must be at least 2 characters",
        },
      },
    },
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
      name: "phone",
      type: "tel",
      placeholder: "Enter your phone number",
      label: "Phone Number",
      validation: {
        required: "Phone number is required",
        pattern: {
          value: /^[\+]?[1-9][\d]{0,15}$/,
          message: "Invalid phone number",
        },
      },
    },
    {
      name: "password",
      type: "password",
      placeholder: "Create a password",
      label: "Password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          message: "Password must contain uppercase, lowercase, and number",
        },
      },
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
      label: "Confirm Password",
      validation: {
        required: "Please confirm your password",
        validate: (value: string, formValues: any) => 
          value === formValues.password || "Passwords do not match",
      },
    },
  ];

  const handleSignup = async (data: any) => {
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      
      if (res.ok && result.success) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/authentication/login");
        }, 1500);
      } else {
        setError(result.error || "Signup failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      fields={signupFields}
      title="Create Account"
      description="Join our blood donation community"
      submitLabel="Create Account"
      loading={loading}
      handleSubmit={handleSignup}
      error={error}
      success={success}
      showProviders={true}
      links={[
        { name: "Already have an account? Sign in", href: "/authentication/login" },
      ]}
    />
  );
}
