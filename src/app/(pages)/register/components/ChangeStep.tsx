import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const ChangeStep = ({
  loading,
  setLoading,
  step,
  setStep,
  isActive,
  formData,
}: {
  loading: true | false;
  setLoading: any;
  step: number;
  setStep: any;
  isActive: boolean;
  formData?: any; // this should be the state of the form inputs  }) => {
}) => {
  const router = useRouter();
  const handleSubmit = async () => {
    setLoading(true);
    if (step >= 1 && step < 3 ) {
      setStep(step + 1);
      setLoading(false);
    }
    else if (step === 3) {
      // Register the donor
      try {
        const res = await fetch('/api/donors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          router.replace('/success');
        } else {
          alert('Registration failed');
        }
      } catch (e) {
        alert('Registration failed');
      }
      setLoading(false);
    }
  };
  return (
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
        disabled={!isActive || loading}
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
  );
};

export default ChangeStep;
