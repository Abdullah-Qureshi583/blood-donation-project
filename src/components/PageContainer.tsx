import React from "react";
import PageHero from "./PageHero";
interface ComProps {
  children: React.ReactNode;
  title: string;
  description: string;
}
const PageContainer = ({ children, title, description }: ComProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <PageHero title={title} description={description} />
      <div className="container mx-auto px-4 -mt-8">{children}</div>
    </div>
  );
};

export default PageContainer;
