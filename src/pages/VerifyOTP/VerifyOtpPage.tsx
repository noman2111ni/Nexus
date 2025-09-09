import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OtpVerify } from "../../components/ui/OtpVerify";
import { Button } from "../../components/ui/Button";

export const VerifyOtpPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleComplete = (otp: string) => {
    if (otp === "123456") {
      navigate("/dashboard/entrepreneur"); // Dummy redirect
    } else {
      setError("Invalid OTP, please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
        <p className="text-gray-600 mb-4">
          Enter the 6-digit OTP (hint: 123456)
        </p>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <OtpVerify length={6} onComplete={handleComplete} />

        <Button
          className="mt-6 w-full"
          onClick={() => handleComplete("123456")}
        >
          Dummy Auto-Verify
        </Button>
      </div>
    </div>
  );
};
