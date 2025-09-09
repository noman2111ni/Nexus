import React, { useState } from "react";
import { Transaction, UserRole } from "../../types";

interface DepositFormProps {
  currentUser: UserRole;
  onTransaction: (tx: Transaction) => void;
}

export default function DepositForm({ currentUser, onTransaction }: DepositFormProps) {
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;

    const tx: Transaction = {
      id: Math.random().toString(36).slice(2),
      type: "deposit",
      amount,
      sender: "Bank",
      receiver: currentUser,
      status: "completed",
      date: new Date().toISOString(),
    };

    onTransaction(tx);
    setAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-xl space-y-4">
      <h2 className="text-lg font-semibold">Deposit Funds</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount"
        className="w-full border px-3 py-2 rounded-xl"
      />
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-xl">
        Deposit
      </button>
    </form>
  );
}
