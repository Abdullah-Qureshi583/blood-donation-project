export type LocationData = {
  provinces: string[];
  districts: { [key: string]: string[] };
  tehsils: { [key: string]: string[] };
  unionCouncils: { [key: string]: string[] };
  villages: { [key: string]: string[] };
};

export type LocationSelectFieldProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
};

export type RenderLocationStepProps = {
  formData: any;
  handleLocationChange: (field: string, value: string) => void;
  step: number;
  setStep: (step: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError?: (message: string) => void;
  setSuccess?: (message: string) => void;
  clearMessages?: () => void;
};
