import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageContainer from "@/components/PageContainer";
import React from "react";
import Login from "./components/Login";
import AuthForm from "./components/AuthForm";

const Authentication = () => {
  return (
    <PageContainer
      title="Become a Blood Donor"
      description="Register as a blood donor and help save lives by connecting with those in need."
    >
      {/* <Login /> */}
      <AuthForm
        fields={[
          {
            name: "email",
            type: "email",
            placeholder: "Email",
            validation: { required: "Email is required" },
          },
          {
            name: "password",
            type: "password",
            placeholder: "Password",
            validation: { required: "Password is required" },
          },
        ]}
        providers={["google", "facebook"]}
        showProviders={true}
        title="Login"
        submitLabel="Login"
        links={[
          { name: "Don't have an account? Register", href: "/register" },
          { name: "Forgot password?", href: "/forgot-password" },
        ]}
        // onSubmitCustom={async (data) => {
        //   console.log("Form submitted with:", data);
        //   // Example: await loginUser(data.email, data.password);
        // }}
      />
    </PageContainer>
  );
};

export default Authentication;
