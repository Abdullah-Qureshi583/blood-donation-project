import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { LocationSelectFieldProps } from "@/app/(pages)/register/types/renderLocationStepTypes";

const LocationSelectField: React.FC<LocationSelectFieldProps> = ({
  label,
  value,
  onValueChange,
  options,
}) => {
  return (
    <FormField
      name={label.toLowerCase()}
      render={() => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {options && options.length > 0 ? (
                options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-options" disabled>
                  No options available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default LocationSelectField;
