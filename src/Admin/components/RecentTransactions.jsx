const txns = [
  { id: "TX9921", user: "John Doe", amount: "$1,200", status: "SUCCESS" },
  { id: "TX9922", user: "Sarah Smith", amount: "$450", status: "FAILED" },
  { id: "TX9923", user: "Mike Jones", amount: "$9,000", status: "FLAGGED" },
  { id: "TX9924", user: "Emma W.", amount: "$120", status: "SUCCESS" },
];

export default function RecentTransactions() {
  return (
    <div className="border border-gray-700 p-4">
      <h3 className="mb-3">RECENT TRANSACTIONS (Live Feed)</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700">
            <th>TXN ID</th>
            <th>USER</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {txns.map(t => (
            <tr key={t.id} className="border-b border-gray-800">
              <td>{t.id}</td>
              <td>{t.user}</td>
              <td>{t.amount}</td>
              <td
                className={
                  t.status === "SUCCESS"
                    ? "text-green-400"
                    : t.status === "FAILED"
                    ? "text-red-400"
                    : "text-yellow-400"
                }
              >
                {t.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
