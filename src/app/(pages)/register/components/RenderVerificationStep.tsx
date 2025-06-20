"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import ChangeStep from "./ChangeStep";
import { RenderVerificationStepProps } from "../types/RenderVerificationStepTypes";

const RenderVerificationStep: React.FC<RenderVerificationStepProps> = ({
  loading,
  setLoading,
  formData,
  handleLocationChange,
  step,
  setStep,
}) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [serverOTP, setServerOTP] = useState("");
  const [lockedEmail, setLockedEmail] = useState("");
  const prevEmailRef = useRef(formData.email);

  // If email changes after OTP is sent, reset OTP state
  useEffect(() => {
    if (otpSent && formData.email !== lockedEmail) {
      setOtpSent(false);
      setServerOTP("");
    }
    prevEmailRef.current = formData.email;
  }, [formData.email, otpSent, lockedEmail]);

  const isActive = formData.otp !== "" && formData.otp === serverOTP && otpSent && formData.email === lockedEmail;

  const sendOTP = async () => {
    setOtpLoading(true);
    try {
      const res = await fetch("/api/donors/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (res.ok) {
        setServerOTP(data.otp);
        setOtpSent(true);
        setLockedEmail(formData.email);
      } else {
        alert("Failed to send OTP: " + data.error);
      }
    } catch (e) {
      alert("Failed to send OTP");
    }
    setOtpLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* Email Input */}
      <FormItem>
        <FormLabel>Email Address</FormLabel>
        <div className="flex space-x-2">
          <FormControl>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleLocationChange("email", e.target.value)}
              placeholder="Enter your email address"
            />
          </FormControl>
          <Button onClick={sendOTP} disabled={otpLoading || (otpSent && formData.email === lockedEmail) || formData.email === ""}>
            {otpLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Send OTP"
            )}
          </Button>
        </div>
      </FormItem>

      {/* OTP Input (Conditional) */}
      {otpSent && formData.email === lockedEmail && (
        <FormItem>
          <FormLabel>Enter OTP</FormLabel>
          <FormControl>
            <Input
              value={formData.otp}
              onChange={(e) => handleLocationChange("otp", e.target.value)}
              placeholder="Enter OTP"
            />
          </FormControl>
        </FormItem>
      )}

      {/* Step Navigation */}
      <ChangeStep
        isActive={isActive}
        step={step}
        setStep={setStep}
        loading={loading}
        setLoading={setLoading}
        formData={formData}
      />
    </div>
  );
};

export default RenderVerificationStep;
