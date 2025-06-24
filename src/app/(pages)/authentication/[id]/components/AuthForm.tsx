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
}: AuthFormProps) {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>

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

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Please wait..." : submitLabel}
        </Button>
      </form>

      <div className="space-y-2">
        {links.map((link, index) => (
          <div key={index} className="text-sm text-center">
            {link.onClick ? (
              <button
                onClick={link.onClick}
                className="text-primary hover:underline"
              >
                {link.name}
              </button>
            ) : (
              <Link href={link.href} className="text-primary hover:underline">
                {link.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
