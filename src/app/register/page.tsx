"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { Calendar } from "@/components/ui/calendar";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import PageContainer from "@/components/PageContainer";

// // Mock data - Replace with actual API calls
type LocationData = {
  provinces: string[];
  districts: { [key: string]: string[] };
  tehsils: { [key: string]: string[] };
  unionCouncils: { [key: string]: string[] };
  villages: { [key: string]: string[] };
};

const locationData: LocationData = {
  provinces: ["Punjab", "Sindh", "KPK", "Balochistan"],
  districts: {
    Punjab: ["Lahore", "Faisalabad", "Rawalpindi"],
    Sindh: ["Karachi", "Hyderabad", "Sukkur"],
    KPK: ["Peshawar", "Abbottabad", "Mardan"],
    Balochistan: ["Quetta", "Gwadar", "Turbat"],
  },
  tehsils: {
    Lahore: ["Tehsil 1", "Tehsil 2", "Tehsil 3"],
    Faisalabad: ["Tehsil 4", "Tehsil 5"],
    Rawalpindi: ["Tehsil 6", "Tehsil 7"],
    Karachi: ["Tehsil A", "Tehsil B", "Tehsil C"],
    Hyderabad: ["Tehsil D", "Tehsil E"],
    Sukkur: ["Tehsil F", "Tehsil G"],
    Peshawar: ["Tehsil H", "Tehsil I"],
    Abbottabad: ["Tehsil J", "Tehsil K"],
    Mardan: ["Tehsil L", "Tehsil M"],
    Quetta: ["Tehsil N", "Tehsil O"],
    Gwadar: ["Tehsil P", "Tehsil Q"],
    Turbat: ["Tehsil R", "Tehsil S"],
  },
  unionCouncils: {
    "Tehsil 1": ["Union Council 1", "Union Council 2"],
    "Tehsil 2": ["Union Council 3", "Union Council 4"],
    "Tehsil A": ["Union Council X", "Union Council Y"],
    "Tehsil B": ["Union Council Z", "Union Council W"],
    "Tehsil D": ["Union Council 5", "Union Council 6"],
    "Tehsil F": ["Union Council 7", "Union Council 8"],
    "Tehsil H": ["Union Council 9", "Union Council 10"],
    "Tehsil J": ["Union Council 11", "Union Council 12"],
    "Tehsil N": ["Union Council 13", "Union Council 14"],
    "Tehsil P": ["Union Council 15", "Union Council 16"],
  },
  villages: {
    "Union Council 1": ["Village A", "Village B"],
    "Union Council 2": ["Village C", "Village D"],
    "Union Council 3": ["Village E", "Village F"],
    "Union Council 4": ["Village G", "Village H"],
    "Union Council X": ["Village X1", "Village X2"],
    "Union Council Y": ["Village Y1", "Village Y2"],
    "Union Council Z": ["Village Z1", "Village Z2"],
    "Union Council 5": ["Village I1", "Village I2"],
    "Union Council 7": ["Village J1", "Village J2"],
    "Union Council 9": ["Village K1", "Village K2"],
    "Union Council 11": ["Village L1", "Village L2"],
    "Union Council 13": ["Village M1", "Village M2"],
    "Union Council 15": ["Village N1", "Village N2"],
  },
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function DonorRegistration() {
  const form = useForm();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    country: "Pakistan",
    province: "",
    district: "",
    tehsil: "",
    unionCouncil: "",
    village: "",
    fullName: "",
    fatherName: "",
    mobileNumber: "",
    bloodGroup: "",
    lastDonation: null as Date | null,
    otp: "",
  });

  const handleLocationChange = (field: string, value: string | Date | null) => {
    setFormData((prev) => {
      let updatedData = { ...prev, [field]: value };

      if (field === "province") {
        updatedData = {
          ...updatedData,
          district: "",
          tehsil: "",
          unionCouncil: "",
          village: "",
        };
      } else if (field === "district") {
        updatedData = {
          ...updatedData,
          tehsil: "",
          unionCouncil: "",
          village: "",
        };
      } else if (field === "tehsil") {
        updatedData = { ...updatedData, unionCouncil: "", village: "" };
      } else if (field === "unionCouncil") {
        updatedData = { ...updatedData, village: "" };
      }

      return updatedData;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Add API call logic here
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
    setLoading(false);

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const sendOTP = async () => {
    setLoading(true);
    // Add OTP sending logic here
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOtpSent(true);
    setLoading(false);
  };

  const renderLocationStep = () => (
    <div className="space-y-4">
      <FormField
        name="country"
        render={() => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Input value="Pakistan" disabled />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        name="province"
        render={() => (
          <FormItem>
            <FormLabel>Province</FormLabel>
            <Select
              value={formData.province}
              onValueChange={(value) => handleLocationChange("province", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Province" />
              </SelectTrigger>
              <SelectContent>
                {locationData.provinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      {formData.province && (
        <FormField
          name="district"
          render={() => (
            <FormItem>
              <FormLabel>District</FormLabel>
              <Select
                value={formData.district}
                onValueChange={(value) =>
                  handleLocationChange("district", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {locationData?.districts[formData.province]?.map(
                    (district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      )}

      {formData.district && (
        <FormField
          name="tehsil"
          render={() => (
            <FormItem>
              <FormLabel>Tehsil</FormLabel>
              <Select
                value={formData.tehsil}
                onValueChange={(value) => handleLocationChange("tehsil", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Tehsil" />
                </SelectTrigger>
                <SelectContent>
                  {locationData.tehsils[formData.district]?.map((tehsil) => (
                    <SelectItem key={tehsil} value={tehsil}>
                      {tehsil}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      )}

      {formData.tehsil && (
        <FormField
          name="unionCouncil"
          render={() => (
            <FormItem>
              <FormLabel>Union Council</FormLabel>
              <Select
                value={formData.unionCouncil}
                onValueChange={(value) =>
                  handleLocationChange("unionCouncil", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Union Council" />
                </SelectTrigger>
                <SelectContent>
                  {locationData.unionCouncils[formData.tehsil]?.map((uc) => (
                    <SelectItem key={uc} value={uc}>
                      {uc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      )}

      {formData.unionCouncil && (
        <FormField
          name="village"
          render={() => (
            <FormItem>
              <FormLabel>Village</FormLabel>
              <Select
                value={formData.village}
                onValueChange={(value) =>
                  handleLocationChange("village", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Village" />
                </SelectTrigger>
                <SelectContent>
                  {locationData.villages[formData.unionCouncil]?.map(
                    (village) => (
                      <SelectItem key={village} value={village}>
                        {village}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      )}
    </div>
  );

  const renderPersonalInfoStep = () => (
    <div className="space-y-4">
      <FormField
        name="fullName"
        render={() => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input
                value={formData.fullName}
                onChange={(e) =>
                  handleLocationChange("fullName", e.target.value)
                }
                placeholder="Enter your full name"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        name="fatherName"
        render={() => (
          <FormItem>
            <FormLabel>Fathers Name</FormLabel>
            <FormControl>
              <Input
                value={formData.fatherName}
                onChange={(e) =>
                  handleLocationChange("fatherName", e.target.value)
                }
                placeholder="Enter your father's name"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        name="bloodGroup"
        render={() => (
          <FormItem>
            <FormLabel>Blood Group</FormLabel>
            <Select
              value={formData.bloodGroup}
              onValueChange={(value) =>
                handleLocationChange("bloodGroup", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Blood Group" />
              </SelectTrigger>
              <SelectContent>
                {bloodGroups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />

      <FormField
        name="lastDonation"
        render={() => (
          <FormItem>
            <FormLabel>Last Donation Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.lastDonation ? (
                    format(formData.lastDonation, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.lastDonation || undefined}
                  onSelect={(date) =>
                    handleLocationChange("lastDonation", date || null)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    </div>
  );

  const renderVerificationStep = () => (
    <div className="space-y-4">
      <FormField
        name="mobileNumber"
        render={() => (
          <FormItem>
            <FormLabel>Mobile Number</FormLabel>
            <div className="flex space-x-2">
              <FormControl>
                <Input
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    handleLocationChange("mobileNumber", e.target.value)
                  }
                  placeholder="Enter your mobile number"
                />
              </FormControl>
              <Button onClick={sendOTP} disabled={loading || otpSent}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Send OTP"
                )}
              </Button>
            </div>
          </FormItem>
        )}
      />

      {otpSent && (
        <FormField
          name="otp"
          render={() => (
            <FormItem>
              <FormLabel>Enter OTP</FormLabel>
              <FormControl>
                <Input
                  value={formData.otp}
                  onChange={(e) => handleLocationChange("otp", e.target.value)}
                  placeholder="Enter OTP"
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );

  return (
    <PageContainer
      title="Become a Blood Donor"
      description="Register as a blood donor and help save lives by connecting with those in need."
    >
      <Card>
        <CardHeader>
          <CardTitle>Donor Registration</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= i ? "bg-red-600 text-white" : "bg-gray-200"
                }`}
              >
                {i}
              </div>
            ))}
          </div>

          <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              {step === 1 && renderLocationStep()}
              {step === 2 && renderPersonalInfoStep()}
              {step === 3 && renderVerificationStep()}

              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  type="button"
                  className="bg-red-600 hover:bg-red-700 ml-auto"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : step === 3 ? (
                    "Complete Registration"
                  ) : (
                    "Next"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
