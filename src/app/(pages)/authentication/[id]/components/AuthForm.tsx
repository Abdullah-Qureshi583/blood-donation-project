"use client";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export interface FieldDefinition {
  name: string;
  type: string;
  placeholder: string;
  label?: string;
  validation?: any;
  disabled?: boolean;
  defaultValue?: string;
}

interface LinkDefinition {
  name: string;
  href: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface AuthFormProps {
  fields: FieldDefinition[];
  title: string;
  description: string;
  submitLabel: string;
  loading: boolean;
  handleSubmit: (data: any) => Promise<void>;
  error: string;
  success: string;
  links: LinkDefinition[];
  disableAll?: boolean;
}

export default function AuthForm({
  fields,
  title,
  description,
  submitLabel,
  loading,
  handleSubmit,
  error,
  success,
  links,
  disableAll = false,
}: AuthFormProps) {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full max-w-md mx-auto py-8">
      <Card className="border border-gray-200 shadow-lg rounded-xl p-6 bg-white dark:bg-gray-900">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold mb-1">{title}</CardTitle>
          <p className="text-gray-500 dark:text-gray-400 text-base">{description}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name, field.validation)}
                />
                {errors[field.name] && (
                  <p className="text-sm text-red-500">
                    {errors[field.name]?.message as string}
                  </p>
                )}
              </div>
            ))}

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            {success && <p className="text-sm text-green-500 text-center">{success}</p>}

            <Button type="submit" className="w-full mt-2" disabled={loading || disableAll}>
              {loading ? "Please wait..." : submitLabel}
            </Button>
          </form>
          <div className="space-y-2 mt-6">
            {links.map((link, index) => (
              <div key={index} className="text-sm text-center">
                {link.onClick ? (
                  <button
                    onClick={link.onClick}
                    className="text-primary hover:underline"
                    disabled={link.disabled || disableAll}
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link href={link.href} className={cn("text-primary hover:underline", disableAll && "pointer-events-none opacity-60")}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
