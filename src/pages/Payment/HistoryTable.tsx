import { Transaction, UserRole } from "../../types";
interface HistoryTableProps {
  transactions: Transaction[];
  currentUser: UserRole;
}

export default function HistoryTable({ transactions, currentUser }: HistoryTableProps) {
  // Investor sirf apne transactions dekhe
  const filteredTx =
    currentUser === "investor"
      ? transactions.filter((tx) => tx.sender === "investor" || tx.receiver === "investor")
      : transactions;

  if (filteredTx.length === 0) {
    return (
      <div className="p-4 bg-white shadow rounded-xl text-center">
        <p className="text-gray-500">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow rounded-xl overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Sender</th>
            <th className="p-2 border">Receiver</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTx.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50">
              <td className="p-2 border">{tx.id}</td>
              <td className="p-2 border">{tx.type}</td>
              <td className="p-2 border">PKR {tx.amount.toLocaleString()}</td>
              <td className="p-2 border">{tx.sender}</td>
              <td className="p-2 border">{tx.receiver}</td>
              <td className="p-2 border">{tx.status}</td>
              <td className="p-2 border">{new Date(tx.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
