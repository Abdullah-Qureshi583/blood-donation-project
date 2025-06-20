export interface FieldSelectProps {
  label: string;
  options: string[];
  onChange: (value: string) => void;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
}

export type SearchDataType = {
  selectedBloodGroup: string;
  selectedProvince: string;
  selectedDistrict: string;
  selectedTehsil?: string;
  selectedUC?: string;
  activeOnly: boolean;
};
