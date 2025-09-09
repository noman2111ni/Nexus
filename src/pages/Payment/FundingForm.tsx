import React, { useState } from "react";
import { Transaction, UserRole } from "../../types";

interface FundingFormProps {
  onTransaction: (
    tx: Transaction,
    updates: Partial<Record<UserRole, number>>
  ) => void;
}

export default function FundingForm({ onTransaction }: FundingFormProps) {
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;

    const tx: Transaction = {
      id: Math.random().toString(36).slice(2),
      type: "funding",
      amount,
      sender: "investor",
      receiver: "entrepreneur",
      status: "completed",
      date: new Date().toISOString(),
    };

    const updates: Partial<Record<UserRole, number>> = {
      investor: -amount,
      entrepreneur: amount,
    };

    onTransaction(tx, updates);
    setAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-xl space-y-4">
      <h2 className="text-lg font-semibold">Funding Deal</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter funding amount"
        className="w-full border px-3 py-2 rounded-xl"
      />
      <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-xl">
        Fund Startup
      </button>
    </form>
  );
}
