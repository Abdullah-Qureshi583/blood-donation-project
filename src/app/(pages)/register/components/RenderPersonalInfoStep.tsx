import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import bloodGroupData from "@/data/bloodGroups.json";
import ChangeStep from "./ChangeStep";
import PersonalInfoSelectField from "./selectFields/PersonalInfoSelectField";
import { RenderPersonalInfoStepProps } from "../types/renderPersonalInfoStepTypes";

const bloodGroups: string[] = bloodGroupData;

const RenderPersonalInfoStep: React.FC<RenderPersonalInfoStepProps> = ({
  formData,
  handleLocationChange,
  step,
  setStep,
  loading,
  setLoading,
}) => {
  const isActive =
    formData.name.trim() !== "" && 
    formData.fatherName.trim() !== "" &&
    formData.bloodGroup !== "" && 
    formData.lastDonation instanceof Date;


  return (
    <div className="space-y-4">
      <PersonalInfoSelectField
        label="Full Name"
        value={formData.name}
        onChange={(value) => handleLocationChange("name", value)}
        placeholder="Enter your full name"
      />

      <PersonalInfoSelectField
        label="Fathers Name"
        value={formData.fatherName}
        onChange={(value) => handleLocationChange("fatherName", value)}
        placeholder="Enter your father's name"
      />

      <PersonalInfoSelectField
        label="Blood Group"
        value={formData.bloodGroup}
        onChange={(value) => handleLocationChange("bloodGroup", value)}
        placeholder="Select Blood Group"
        isSelect={true}
        options={bloodGroups}
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
                  disabled={(date) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
      <ChangeStep
        isActive={isActive}
        step={step}
        setStep={setStep}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default RenderPersonalInfoStep;
