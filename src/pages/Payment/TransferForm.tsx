import React, { useState } from "react";
import { Transaction, UserRole } from "../../types";

interface TransferFormProps {
  currentUser: UserRole;
  onTransaction: (
    tx: Transaction,
    updates: Partial<Record<UserRole, number>>
  ) => void;
}

export default function TransferForm({ currentUser, onTransaction }: TransferFormProps) {
  const [amount, setAmount] = useState<number>(0);
  const [receiver, setReceiver] = useState<UserRole>("entrepreneur");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0 || receiver === currentUser) return;

    const tx: Transaction = {
      id: Math.random().toString(36).slice(2),
      type: "transfer",
      amount,
      sender: currentUser,
      receiver,
      status: "completed",
      date: new Date().toISOString(),
    };

    const updates: Partial<Record<UserRole, number>> = {
      [currentUser]: -amount,
      [receiver]: amount,
    };

    onTransaction(tx, updates);
    setAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-xl space-y-4">
      <h2 className="text-lg font-semibold">Transfer Funds</h2>
      <select
        value={receiver}
        onChange={(e) => setReceiver(e.target.value as UserRole)}
        className="w-full border px-3 py-2 rounded-xl"
      >
        <option value="investor">Investor</option>
        <option value="entrepreneur">Entrepreneur</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount"
        className="w-full border px-3 py-2 rounded-xl"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl">
        Transfer
      </button>
    </form>
  );
}
