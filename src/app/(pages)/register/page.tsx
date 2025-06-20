"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import PageContainer from "@/components/PageContainer";
import RenderLocationStep from "./components/RenderLocationStep";
import RenderPersonalInfoStep from "./components/RenderPersonalInfoStep";
import RenderVerificationStep from "./components/RenderVerificationStep";

export default function DonorRegistration() {
  const form = useForm();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    country: "Pakistan",
    province: "",
    district: "",
    tehsil: "",
    unionCouncil: "",
    village: "",
    name: "",
    fatherName: "",
    email: "",
    bloodGroup: "",
    lastDonation: null as Date | null,
    otp: "",
  });

  

  const handleLocationChange = (field: string, value: string | Date | null) => {
    setFormData((prev) => {
      let updatedData = { ...prev, [field]: value };

      if (field === "province") {
        updatedData = {
          ...updatedData,
          district: "",
          tehsil: "",
          unionCouncil: "",
          village: "",
        };
      } else if (field === "district") {
        updatedData = {
          ...updatedData,
          tehsil: "",
          unionCouncil: "",
          village: "",
        };
      } else if (field === "tehsil") {
        updatedData = { ...updatedData, unionCouncil: "", village: "" };
      } else if (field === "unionCouncil") {
        updatedData = { ...updatedData, village: "" };
      }

      return updatedData;
    });
  };

  return (
    <PageContainer
      title="Become a Blood Donor"
      description="Register as a blood donor and help save lives by connecting with those in need."
    >
      <Card>
        <CardHeader>
          <CardTitle>Donor Registration</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Progress Steps */}
          <div className="flex justify-between mb-8 ">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= i ? "bg-normalRed text-white" : "bg-gray-200"
                }`}
              >
                {i}
              </div>
            ))}
          </div>

          <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {step === 1 && (
                <RenderLocationStep
                  formData={formData}
                  handleLocationChange={handleLocationChange}
                  step={step}
                  setStep={setStep}
                  loading={loading}
                  setLoading={setLoading}
                />
              )}
              {step === 2 && (
                <RenderPersonalInfoStep
                  formData={formData}
                  handleLocationChange={handleLocationChange}
                  step={step}
                  setStep={setStep}
                  loading={loading}
                  setLoading={setLoading}
                />
              )}
              {step === 3 && (
                <RenderVerificationStep
                  loading={loading}
                  setLoading={setLoading}
                  formData={formData}
                  handleLocationChange={handleLocationChange}
                  step={step}
                  setStep={setStep}
                />
              )}
              {step === 4 && <div>cndj</div>}
            </form>
          </Form>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
