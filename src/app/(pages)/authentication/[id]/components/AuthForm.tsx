"use client";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export interface FieldDefinition {
  name: string;
  type: string;
  placeholder: string;
  validation?: any;
}

interface LinkDefinition {
  name: string;
  href: string;
}

interface AuthFormProps {
  fields: FieldDefinition[];
  providers?: string[];
  showProviders?: boolean;
  title?: string;
  submitLabel?: string;
  links?: LinkDefinition[];
  onSubmitCustom?: (data: any) => Promise<void> | void;
}

export default function AuthForm({
  fields,
  providers = ["google", "facebook"],
  showProviders = true,
  title = "Login",
  submitLabel = "Login",
  links,
  onSubmitCustom,
}: AuthFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [error, setError] = useState("");

  // Submit handler
  const onSubmit = async (data: any) => {
    setError("");
    try {
      if (onSubmitCustom) {
        await onSubmitCustom(data);
      } else {
        // Default: try credentials login
        const res = await signIn("credentials", { redirect: false, ...data });
        if (res?.error) setError(res.error);
        else if (res?.ok) window.location.href = "/dashboard";
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  // Provider button rendering
  const renderProviderButtons = () => (
    <div className="flex gap-2 mt-2 mb-2">
      {providers.map((provider) => (
        <button
          key={provider}
          type="button"
          className="flex-1 bg-gray-100 border border-gray-300 rounded py-2 px-2 hover:bg-gray-200 transition"
          onClick={() => signIn(provider)}
        >
          Login with {provider.charAt(0).toUpperCase() + provider.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <div className="max-w-md mx-auto mt-2 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <input
              className="w-full border p-2 rounded focus:outline-blue-500"
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.name, field.validation)}
            />
            {errors[field.name] && (
              <div className="text-red-600 text-sm">
                {errors[field.name]?.message as string}
              </div>
            )}
          </div>
        ))}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? submitLabel + "..." : submitLabel}
        </button>
        {showProviders && renderProviderButtons()}
        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
      </form>
      {links && links.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-600">
          {links.map((link, idx) => (
            <div key={idx}>
              <a href={link.href} className="text-blue-600 hover:underline">
                {link.name}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
