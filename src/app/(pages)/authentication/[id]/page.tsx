import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgetPassword from "./components/ForgetPassword";

interface AuthenticationPageProps {
  params: {
    id: string;
  };
}

const Authentication = ({ params }: AuthenticationPageProps) => {
  const { id } = params;

  // Function to render the appropriate component based on the route
  const renderComponent = () => {
    switch (id.toLowerCase()) {
      case "login":
        return <Login />;
      case "signup":
      case "register":
        return <Signup />;
      case "forgot-password":
      case "forget-password":
      case "reset-password":
        return <ForgetPassword />;
      default:
        // Default to login if route doesn't match
        return <Login />;
    }
  };

  return renderComponent();
};

export default Authentication;
