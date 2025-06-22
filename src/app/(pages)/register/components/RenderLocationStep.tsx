import React from "react";
import locationDataJson from "@/data/locationData.json";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import ChangeStep from "./ChangeStep";
import {
  LocationData,
  RenderLocationStepProps,
} from "@/app/(pages)/register/types/renderLocationStepTypes";
import LocationSelectField from "./selectFields/LocationSelectField";

const locationData: LocationData = locationDataJson;

const RenderLocationStep: React.FC<RenderLocationStepProps> = ({
  formData,
  handleLocationChange,
  step,
  setStep,
  loading,
  setLoading,
  setError,
  setSuccess,
  clearMessages,
}) => {
  const isActive =
    !!formData.province && // Province must be selected
    (!locationData.districts[formData.province] || !!formData.district) &&
    (!locationData.tehsils[formData.district] || !!formData.tehsil) &&
    (!locationData.unionCouncils[formData.tehsil] || !!formData.unionCouncil) &&
    (!locationData.villages[formData.unionCouncil] || !!formData.village);

  return (
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
      <LocationSelectField
        label="Province"
        value={formData.province}
        onValueChange={(value) => handleLocationChange("province", value)}
        options={locationData.provinces}
      />
      {formData.province && locationData.districts[formData.province] && (
        <LocationSelectField
          label="District"
          value={formData.district}
          onValueChange={(value) => handleLocationChange("district", value)}
          options={locationData.districts[formData.province] || []}
        />
      )}
      {formData.district && locationData.tehsils[formData.district] && (
        <LocationSelectField
          label="Tehsil"
          value={formData.tehsil}
          onValueChange={(value) => handleLocationChange("tehsil", value)}
          options={locationData.tehsils[formData.district] || []}
        />
      )}
      {formData.tehsil && locationData.unionCouncils[formData.tehsil] && (
        <LocationSelectField
          label="Union Council"
          value={formData.unionCouncil}
          onValueChange={(value) => handleLocationChange("unionCouncil", value)}
          options={locationData.unionCouncils[formData.tehsil] || []}
        />
      )}
      {formData.unionCouncil &&
        locationData.villages[formData.unionCouncil] && (
          <LocationSelectField
            label="Village"
            value={formData.village}
            onValueChange={(value) => handleLocationChange("village", value)}
            options={locationData.villages[formData.unionCouncil] || []}
          />
        )}

      <ChangeStep
        formData={formData}
        isActive={isActive}
        step={step}
        setStep={setStep}
        loading={loading}
        setLoading={setLoading}
        setError={setError}
        setSuccess={setSuccess}
        clearMessages={clearMessages}
      />
    </div>
  );
};

export default RenderLocationStep;
