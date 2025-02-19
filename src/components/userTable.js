import { useEffect, useState } from "react";

const API_URL = "https://gl-interview.azurewebsites.net/users?offset=0&limit=100";

export default function UserTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <big className="text-xl font-bold mb-4">User Info Table</big>
      <button onClick={fetchData} disabled={loading} className="mb-4">
        {loading ? "Loading..." : "Refresh Data"}
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Username</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="text-center border">
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
