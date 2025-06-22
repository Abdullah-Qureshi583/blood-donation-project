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
}

interface LinkDefinition {
  name: string;
  href: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface AuthFormProps {
  fields: FieldDefinition[];
  providers?: string[];
  showProviders?: boolean;
  title?: string;
  submitLabel?: string;
  links?: LinkDefinition[];
  onSubmitCustom?: (data: any) => Promise<void> | void;
  loading?: boolean;
  disabled?: boolean;
  description?: string;
  showDivider?: boolean;
  handleSubmit?: (data: any) => Promise<void> | void;
  error?: string;
  success?: string;
}

export default function AuthForm({
  fields,
  providers = ["google", "github"],
  showProviders = true,
  title = "Login",
  submitLabel = "Login",
  links,
  onSubmitCustom,
  loading = false,
  disabled = false,
  description,
  showDivider = true,
  handleSubmit: externalHandleSubmit,
  error: externalError,
  success: externalSuccess,
}: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm({ mode: "onChange" });
  const [error, setError] = useState(externalError || "");
  const [success, setSuccess] = useState(externalSuccess || "");

  // Update internal state when external messages change
  React.useEffect(() => {
    if (externalError !== undefined) {
      setError(externalError);
    }
  }, [externalError]);

  React.useEffect(() => {
    if (externalSuccess !== undefined) {
      setSuccess(externalSuccess);
    }
  }, [externalSuccess]);

  const isFormLoading = loading || isSubmitting;
  const isFormDisabled = disabled || isFormLoading;

  // Check if form is valid and has been interacted with
  const isFormValid = isValid && isDirty;

  // Submit handler
  const onSubmit = async (data: any) => {
    if (isFormDisabled || !isFormValid) return;

    setError("");
    setSuccess("");
    try {
      if (externalHandleSubmit) {
        await externalHandleSubmit(data);
      } else if (onSubmitCustom) {
        await onSubmitCustom(data);
      } else {
        // Default: try credentials login
        const res = await signIn("credentials", { redirect: false, ...data });
        if (res?.error) setError(res.error);
        else if (res?.ok) {
          setSuccess("Login successful! Redirecting...");
          setTimeout(() => (window.location.href = "/dashboard"), 1000);
        }
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  // Provider button rendering
  const renderProviderButtons = () => (
    <div className="flex flex-col gap-3 mt-6">
      {showDivider && (
        <div className="flex items-center w-full gap-2 my-4">
          <div className="flex-1 h-px bg-muted-foreground/30" />
          <span className="text-xs uppercase text-muted-foreground whitespace-nowrap">
            Or continue with
          </span>
          <div className="flex-1 h-px bg-muted-foreground/30" />
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {providers.map((provider) => (
          <Button
            key={provider}
            variant="outline"
            type="button"
            onClick={() => signIn(provider)}
            className="w-full"
            disabled={isFormDisabled}
          >
            {provider.charAt(0).toUpperCase() + provider.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {title}
          </CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground text-center">
              {description}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name} className="text-sm font-medium">
                  {field.label || field.placeholder}
                </Label>
                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  disabled={isFormDisabled || field.disabled}
                  {...register(field.name, field.validation)}
                  className={cn(
                    errors[field.name] &&
                      "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {errors[field.name] && (
                  <p className="text-sm text-destructive">
                    {errors[field.name]?.message as string}
                  </p>
                )}
              </div>
            ))}

            <Button
              type="submit"
              className="w-full bg-normalRed hover:bg-darkRed text-white"
              disabled={isFormDisabled || !isFormValid}
            >
              {isFormLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  {submitLabel}...
                </>
              ) : (
                submitLabel
              )}
            </Button>

            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                {success}
              </div>
            )}
          </form>

          {showProviders && renderProviderButtons()}

          {links && links.length > 0 && (
            <div className="mt-6 text-center space-y-2">
              {links.map((link, idx) => (
                <div key={idx}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      disabled={link.disabled || isFormDisabled}
                      className={cn(
                        "text-sm text-normalBlue hover:text-darkBlue hover:underline transition-colors",
                        link.disabled &&
                          "opacity-50 cursor-not-allowed hover:no-underline"
                      )}
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-normalBlue hover:text-darkBlue hover:underline transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
