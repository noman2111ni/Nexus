import React from "react";

interface PasswordStrengthMeterProps {
  password: string;
}

const getStrength = (password: string) => {
  let score = 0;

  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
};

const strengthLabels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
const strengthColors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-blue-500",
  "bg-green-500",
];

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
}) => {
  const score = getStrength(password);
  const label = strengthLabels[score] || "Too weak";
  const color = strengthColors[score] || "bg-red-500";

  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${(score / 4) * 100}%` }}
        ></div>
      </div>
      {password && (
        <p className="mt-1 text-sm font-medium text-gray-600">{label}</p>
      )}
    </div>
  );
};
