import React from "react";
import { Heart, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface CardProps {
  title: string;
  description: string;
  theme: "red" | "blue";
  linkHref: string;
  linkLable: string;
}
const HomeCardComp = ({
  theme,
  title,
  description,
  linkHref,
  linkLable,
}: CardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-8 flex flex-col items-center text-center">
        <div
          className={`mb-6 p-4 ${
            theme == "red" ? "bg-lightRed" : "bg-lightBlue"
          }  rounded-full`}
        >
          <Heart
            className={`w-8 h-8 ${
              theme == "red" ? "text-normalRed" : "text-normalBlue"
            }`}
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <p className="text-secondaryColor mb-6">{description}</p>
        <Button
          asChild
          size="lg"
          className={` ${
            theme == "red"
              ? "bg-normalRed hover:bg-darkRed"
              : "bg-normalBlue hover:bg-darkBlue"
          }  text-white  w-full max-w-xs`}
        >
          <Link href={linkHref}>{linkLable ? linkLable : "Register Now"}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default HomeCardComp;
