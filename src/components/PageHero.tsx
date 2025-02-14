import React from "react";
interface CompProp {
  title: string;

  description: string;
  children?: React.ReactNode;
}
const PageHero = ({ title, description, children }: CompProp) => {
  return (
    <div className="bg-gradient-to-br from-normalRed to-darkRed text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          {title}{" "}
        </h1>
        <p className="text-xl text-center text-red-100 max-w-2xl mx-auto">
          {description}{" "}
        </p>
        {children}
      </div>
    </div>
  );
};

export default PageHero;
