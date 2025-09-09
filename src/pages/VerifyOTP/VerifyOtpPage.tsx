import React, { useState } from "react";
import { OtpVerify } from "./OtpVerify"; // import your component

export const OtpPage: React.FC = () => {
  const [otpValue, setOtpValue] = useState("");

  const handleOtpComplete = (otp: string) => {
    setOtpValue(otp);
    console.log("OTP entered:", otp);
    // ✅ Call API or verification logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        {/* Logo / Brand */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 flex items-center justify-center bg-indigo-600 text-white rounded-full font-bold text-lg">
            LOGO
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Verify your account
        </h1>
        <p className="text-gray-500 text-center mt-2">
          We’ve sent a 6-digit verification code to your email/phone.
        </p>

        {/* OTP Component */}
        <div className="mt-6 flex justify-center">
          <OtpVerify length={6} onComplete={handleOtpComplete} />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          <button
            onClick={() => alert("Verifying OTP: " + otpValue)}
            disabled={otpValue.length !== 6}
            className={`w-full py-3 rounded-lg font-medium transition ${
              otpValue.length === 6
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Verify Code
          </button>

          <p className="text-center text-sm text-gray-500">
            Didn’t receive the code?{" "}
            <button
              onClick={() => alert("Resend code")}
              className="text-indigo-600 font-medium hover:underline"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
