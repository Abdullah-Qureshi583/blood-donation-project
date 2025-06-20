import React from "react";
import { PersonalInfoSelectFieldProps } from "../../types/renderPersonalInfoStepTypes";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const PersonalInfoSelectField: React.FC<PersonalInfoSelectFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  isSelect,
  options,
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        {isSelect ? (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            name={label.toLowerCase()}
            
          />
        )}
      </FormControl>
    </FormItem>
  );
};

export default PersonalInfoSelectField;
