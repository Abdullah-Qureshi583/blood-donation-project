export interface RenderVerificationStepProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  formData: { email: string; otp: string };
  handleLocationChange: (field: string, value: string| Date | null) => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}