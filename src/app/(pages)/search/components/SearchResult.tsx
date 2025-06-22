import React from "react";
import { LuLoaderCircle } from "react-icons/lu";

import { Calendar, Phone, AlertCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Donor } from "@/types/donor";

const SearchResult = ({
  loading,
  donors,
}: {
  loading: boolean;
  donors: Donor[];
}) => {
  if (loading)
    return (
      <div className="text-2xl font-bold flex gap-1 items-center ml-5">
        {" "}
        <LuLoaderCircle /> Loading...
      </div>
    );
  if (!donors.length)
    return <div className="text-2xl font-bold">No donors found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {donors.map((donor) => (
        <Card key={donor.id}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{donor.name}</h3>

                <p className="text-sm text-gray-500">
                  <span className="text-gray-700">Location:</span>{" "}
                  {donor.village && donor.village + ", "}
                  {donor.unionCouncil && donor.unionCouncil + ", "}
                  {donor.tehsil && donor.tehsil + ", "}
                  {donor.district && donor.district + ", "}
                  {donor.province && donor.province}
                </p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-lightRed text-normalRed">
                {donor.bloodGroup}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                Last Donation: {donor.lastDonation}
              </div>

              <div className="flex items-center text-sm">
                <AlertCircle className="w-4 h-4 mr-2 text-gray-500" />
                Status:{" "}
                <span
                  className={`ml-1 ${
                    donor.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {donor.isActive ? "✅ Active" : "❌ Inactive"}
                </span>
              </div>

              {donor.isPublic ? (
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  {donor.contact}
                </div>
              ) : (
                <Button variant="outline" className="w-full mt-2">
                  Request Contact Details
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SearchResult;
