import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { FieldSelectProps } from "../types/type";

interface ExtendedFieldSelectProps extends FieldSelectProps {
  disabled?: boolean;
  placeholder?: string;
  value?: string;
}

const FieldSelect = ({ label, options, onChange, disabled, placeholder, value }: ExtendedFieldSelectProps) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Select onValueChange={onChange} disabled={disabled} value={value}>
      <SelectTrigger disabled={disabled}>
        <SelectValue placeholder={placeholder || `Select ${label}`} />
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
  </div>
);

export default FieldSelect;