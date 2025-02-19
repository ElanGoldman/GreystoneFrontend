import { useState } from "react";

const API_URL = "https://gl-interview.azurewebsites.net/users/";

export default function LoanTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userid, setUserid] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL + userid.toString() + "/loans?offset=0&limit=100", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      console.log(API_URL + userid + "/loans?offset=0&limit=100");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
        
        <big className="text-xl font-bold mb-4">User Loans Table</big>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
            <input
                type="number"
                onChange={(e) => setUserid(e.target.value)}
                placeholder={`Enter user ID`}
                className="border p-2 mr-2"
            />
            <button onClick={fetchData} disabled={loading} className="mb-4">
                {loading ? "Loading..." : "Fetch Loans"}
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr className="bg-gray-100">
                <th className="border p-2">Loan ID</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">APR</th>
                <th className="border p-2">Term</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Owner ID</th>
                </tr>
            </thead>
            <tbody>
                {data.map((loan) => (
                <tr key={loan.id} className="text-center border">
                    <td className="border p-2">{loan.id}</td>
                    <td className="border p-2">${loan.amount}</td>
                    <td className="border p-2">{loan.apr}%</td>
                    <td className="border p-2">{loan.term}</td>
                    <td className="border p-2">{loan.status}</td>
                    <td className="border p-2">{loan.owner_id}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
  );
}
