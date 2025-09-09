import { useState, useReducer } from "react";
import DepositForm from "./DepositForm";
import WithdrawForm from "./WithdrawForm";
import TransferForm from "./TransferForm";
import FundingForm from "./FundingForm";
import HistoryTable from "./HistoryTable";
import { Transaction, UserRole } from "../../types/index";

// Utility
function shortId(): string {
  return Math.random().toString(36).slice(2, 9);
}

// Reducer
interface State {
  transactions: Transaction[];
  balances: Record<UserRole, number>;
}

type Action =
  | { type: "add_tx"; tx: Transaction }
  | { type: "update_balance"; payload: Partial<Record<UserRole, number>> };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add_tx":
      return { ...state, transactions: [action.tx, ...state.transactions] };
    case "update_balance":
      return {
        ...state,
        balances: { ...state.balances, ...action.payload },
      };
    default:
      return state;
  }
}

function initState(): State {
  return {
    transactions: [],
    balances: {
      investor: 50000,
      entrepreneur: 10000,
    },
  };
}

export default function PaymentsModule() {
  const [state, dispatch] = useReducer(reducer, undefined, initState);
  const [tab, setTab] = useState<string>("dashboard");
  const [role, setRole] = useState<UserRole>("investor");

  const balance = state.balances[role] ?? 0;

  const addTx = (tx: Transaction) => dispatch({ type: "add_tx", tx });
  const updateBalance = (payload: Partial<Record<UserRole, number>>) =>
    dispatch({ type: "update_balance", payload });

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">💳 Payments Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">Role:</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="investor">Investor</option>
            <option value="entrepreneur">Entrepreneur</option>
          </select>
        </div>
      </div>

      {/* Wallet Balance */}
      <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-2xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-gray-700">Wallet Balance</h2>
        <p className="text-3xl font-bold text-gray-900 mt-2">PKR {balance.toLocaleString()}</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3">
        {[
          ["dashboard", "Dashboard"],
          ...(role === "entrepreneur" ? [
              ["deposit", "Deposit"],
              ["withdraw", "Withdraw"]
            ] : []),
          ["transfer", "Transfer"],
          ...(role === "investor" ? [["funding", "Funding Deal"]] : []),
          ["history", "History"]
        ].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setTab(val)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              tab === val
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        {tab === "deposit" && role === "entrepreneur" && (
          <DepositForm
            currentUser={role}
            onTransaction={(tx) => {
              const newBal = (state.balances[role] ?? 0) + tx.amount;
              addTx(tx);
              updateBalance({ [role]: newBal });
              setTab("history");
            }}
          />
        )}

        {tab === "withdraw" && role === "entrepreneur" && (
          <WithdrawForm
            currentUser={role}
            onTransaction={(tx) => {
              const newBal = (state.balances[role] ?? 0) - tx.amount;
              addTx(tx);
              updateBalance({ [role]: newBal });
              setTab("history");
            }}
          />
        )}

        {tab === "transfer" && (
          <TransferForm
            currentUser={role}
            onTransaction={(tx, updates) => {
              addTx(tx);
              updateBalance(updates);
              setTab("history");
            }}
          />
        )}

        {tab === "funding" && role === "investor" && (
          <FundingForm
            onTransaction={(tx, updates) => {
              addTx(tx);
              updateBalance(updates);
              setTab("history");
            }}
          />
        )}

        {tab === "history" && (
          <HistoryTable transactions={state.transactions} currentUser={role} />
        )}

        {tab === "dashboard" && (
          <div className="text-gray-600 text-center py-20">
            <p className="text-xl font-medium">Select a tab to manage transactions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
