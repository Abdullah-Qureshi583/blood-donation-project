"use client";
import { useState, useEffect } from "react";
import AuthForm from "./AuthForm";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "otp" | "register">("form");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams!.get("callbackUrl") || "/dashboard";

  // Load state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("signupState");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setStep(parsedState.step || "form");
        setEmail(parsedState.email || "");
        setOtp(parsedState.otp || "");
        setResendCountdown(parsedState.resendCountdown || 0);
        setAttempts(parsedState.attempts || 0);
      } catch (error) {
        console.error("Error parsing saved signup state:", error);
        clearSignupState();
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  const saveSignupState = (newState: any) => {
    const stateToSave = {
      step: newState.step || step,
      email: newState.email || email,
      otp: newState.otp || otp,
      resendCountdown: newState.resendCountdown || resendCountdown,
      attempts: newState.attempts || attempts,
    };
    localStorage.setItem("signupState", JSON.stringify(stateToSave));
  };

  // Clear signup state from localStorage
  const clearSignupState = () => {
    localStorage.removeItem("signupState");
  };

  // Update step and save state
  const updateStep = (newStep: "form" | "otp" | "register") => {
    setStep(newStep);
    saveSignupState({ step: newStep });
  };

  // Update email and save state
  const updateEmail = (newEmail: string) => {
    setEmail(newEmail);
    saveSignupState({ email: newEmail });
  };

  // Update OTP and save state
  const updateOtp = (newOtp: string) => {
    setOtp(newOtp);
    saveSignupState({ otp: newOtp });
  };

  // Step 1: Form
  const signupFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Enter your first name",
      label: "First Name",
      validation: {
        required: "First name is required",
        minLength: {
          value: 2,
          message: "First name must be at least 2 characters",
        },
      },
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Enter your last name",
      label: "Last Name",
      validation: {
        required: "Last name is required",
        minLength: {
          value: 2,
          message: "Last name must be at least 2 characters",
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
          value: /^[+]?([0-9]{1,16})$/,
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

  // Step 2: OTP - with pre-filled value if available
  const otpFields = [
    {
      name: "otp",
      type: "text",
      placeholder: "Enter 6-digit code",
      label: "Verification Code",
      defaultValue: otp, // Pre-fill with saved OTP
      validation: {
        required: "Verification code is required",
        pattern: {
          value: /^[0-9]{6}$/,
          message: "Please enter a 6-digit code",
        },
      },
    },
  ];

  // Step 3: Registration
  const registerFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Enter your first name",
      label: "First Name",
      validation: {
        required: "First name is required",
        minLength: {
          value: 2,
          message: "First name must be at least 2 characters",
        },
      },
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Enter your last name",
      label: "Last Name",
      validation: {
        required: "Last name is required",
        minLength: {
          value: 2,
          message: "Last name must be at least 2 characters",
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

  // Resend OTP countdown
  const startResendCountdown = () => {
    setResendCountdown(60);
    saveSignupState({ resendCountdown: 60 });
    const interval = setInterval(() => {
      setResendCountdown((prev) => {
        const newCount = prev <= 1 ? 0 : prev - 1;
        saveSignupState({ resendCountdown: newCount });
        if (newCount === 0) {
          clearInterval(interval);
        }
        return newCount;
      });
    }, 1000);
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCountdown > 0) return;
    setLoading(true);
    setError("");
    setSuccess("");
    const cleanEmail = email.trim().toLowerCase();
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const result = await res.json();
      if (res.ok) {
        setSuccess("Verification code resent to your email!");
        startResendCountdown();
      } else if (res.status === 429) {
        // Handle rate limit response
        setResendCountdown(result.remainingTime || 60);
        setError(`Too many attempts. ${result.error}`);
      } else {
        setError("Failed to resend OTP: " + result.error);
      }
    } catch (error) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit with rate limit handling
  const handleFormSubmit = async (data: any) => {
    setLoading(true);
    setError("");
    setSuccess("");
    const cleanEmail = data.email.trim().toLowerCase();
    try {
      // Check if user exists
      const checkUserRes = await fetch("/api/auth/check-user-exist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const userData = await checkUserRes.json();
      if (userData.exists) {
        setError("An account with this email already exists.");
        return;
      }
      // Send OTP
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });
      const result = await res.json();
      if (res.ok) {
        updateEmail(cleanEmail);
        updateOtp("");
        updateStep("otp");
        setAttempts(0);
        saveSignupState({ attempts: 0 });
        startResendCountdown();
        setSuccess("Verification code sent to your email!");
      } else if (res.status === 429) {
        // Handle rate limit response
        setResendCountdown(result.remainingTime || 60);
        setError(`Too many attempts. ${result.error}`);
      } else {
        setError("Failed to send OTP: " + result.error);
      }
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle OTP submit
  const handleOtpSubmit = async (data: any) => {
    setLoading(true);
    setError("");
    setSuccess("");
    const cleanEmail = email.trim().toLowerCase();
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, otp: data.otp }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        updateOtp(data.otp);
        // Register user
        const regRes = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: cleanEmail,
            name: data.name,
            lastName: data.lastName,
            phone: data.phone,
            password: data.password,
          }),
        });
        const regResult = await regRes.json();
        if (regRes.ok && regResult.success) {
          setSuccess("Account created successfully! Logging you in...");
          // Clear signup state after successful registration
          clearSignupState();
          // Auto-login after registration
          await signIn("credentials", {
            email: cleanEmail,
            password: data.password,
            redirect: false,
            callbackUrl,
          });
          router.push(callbackUrl);
        } else {
          setError(regResult.error || "Signup failed. Please try again.");
        }
      } else {
        setError("Incorrect code. Please try again.");
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Handle registration
  const handleRegister = async (data: any) => {
    setLoading(true);
    setError("");
    setSuccess("");
    const cleanEmail = email.trim().toLowerCase();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          name: data.name,
          lastName: data.lastName,
          phone: data.phone,
          password: data.password,
        }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setSuccess("Account created successfully! Logging you in...");
        // Clear signup state after successful registration
        clearSignupState();
        // Auto-login after registration
        await signIn("credentials", {
          email: cleanEmail,
          password: data.password,
          redirect: false,
          callbackUrl,
        });
        setTimeout(() => {
          router.push(callbackUrl);
        }, 1000);
      } else {
        setError(result.error || "Signup failed. Please try again.");
      }
    } catch (error: any) {
      setError(error?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Change email
  const handleChangeEmail = () => {
    updateStep("form");
    updateEmail("");
    // Don't clear OTP - preserve it for when user comes back
    setError("");
    setSuccess("");
    setAttempts(0);
    saveSignupState({ attempts: 0 });
  };

  // Render step
  let fields: any[] = [];
  let title = "";
  let description = "";
  let submitLabel = "";
  let handleSubmit: ((data: any) => Promise<void>) | undefined = undefined;
  let links: { name: string; href: string; onClick?: () => void }[] = [];
  let extra: React.ReactNode = null;

  if (step === "form") {
    fields = signupFields;
    title = "Sign Up";
    description = "Enter your details to get started";
    submitLabel = "Send Code";
    handleSubmit = handleFormSubmit;
    links = [
      { name: "Already have an account? Sign in", href: "/authentication/login" },
    ];
  } else if (step === "otp") {
    fields = otpFields;
    title = "Verify Email";
    description = "Enter the OTP sent to your email to complete registration.";
    submitLabel = "Verify Code & Register";
    handleSubmit = handleOtpSubmit;
    links = [
      { name: "Change email", href: "", onClick: handleChangeEmail },
    ];
  } else if (step === "register") {
    fields = registerFields;
    title = "Create Account";
    description = "Enter your details to finish signing up";
    submitLabel = "Create Account";
    handleSubmit = handleRegister;
    links = [
      { name: "Already have an account? Sign in", href: "/authentication/login" },
    ];
  }

  return (
    <>
      <AuthForm
        fields={fields}
        title={title}
        description={description}
        submitLabel={submitLabel}
        loading={loading}
        handleSubmit={handleSubmit}
        error={error}
        success={success}
        links={links}
        showProviders={step === "form"}
        providers={["google", "github"]}
        showDivider={step === "form"}
      />
      {step === "otp" && (
        <div className="flex items-center gap-2 mt-2 justify-center">
          <button
            type="button"
            className="text-sm text-primary underline disabled:opacity-50"
            onClick={handleResendOtp}
            disabled={resendCountdown > 0 || loading}
          >
            Resend Code{resendCountdown > 0 ? ` (${resendCountdown}s)` : ""}
          </button>
        </div>
      )}
    </>
  );
}
