export interface PersonalInfoSelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isSelect?: boolean;
  options?: string[];
}

export interface RenderPersonalInfoStepProps {
  formData: {
    name: string;
    bloodGroup: string;
    lastDonation: Date | null;
  };
  handleLocationChange: (field: string, value: any) => void;
  step: number;
  setStep: (step: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError?: (message: string) => void;
  setSuccess?: (message: string) => void;
  clearMessages?: () => void;
}