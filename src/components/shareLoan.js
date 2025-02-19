import { useState } from "react";

export default function ShareLoan() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [loanid, setLoanid] = useState(0);
    const [ownerid, setOwnerid] = useState(0);
    const [userid, setUserid] = useState(0);

    const fetchData = async () => {
        setLoading(true);
        setMessage("Loading...");
        console.log(`https://gl-interview.azurewebsites.net/loans/${loanid}/share?owner_id=${ownerid}&user_id=${userid}`);
        try {
            const response = await fetch(`https://gl-interview.azurewebsites.net/loans/${loanid}/share?owner_id=${ownerid}&user_id=${userid}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: ""
            });
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }
            setMessage("Successfully shared loan");
        } catch (error) {
            setMessage("Failed to share loan");
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className = "p-4">
        <big className="text-xl font-bold mb-4">Share Loan</big>
        <div className="inputs" >
            <div>
                <label>Enter loan ID</label>
                <br />
                <input
                type="number"
                onChange={(e) => setLoanid(e.target.value)}
                placeholder={`Enter loanid`}
                className="border p-2 mr-2"
                /> 
            </div>
            <div>
                <label>Enter owner ID</label>
                <br />
                <input
                type="number"
                onChange={(e) => setOwnerid(e.target.value)}
                placeholder={`Enter ownerid`}
                className="border p-2 mr-2"
                /> 
            </div>
            <div>
                <label>Enter user ID</label>
                <br />
                <input
                type="number"
                onChange={(e) => setUserid(e.target.value)}
                placeholder={`Enter userid`}
                className="border p-2 mr-2"
                /> 
            </div>
        </div>
        
        <button onClick={fetchData} disabled={loading} className="mb-4"> Submit </button>

        {message && <p className="text-green-500"> {message}</p>}
      </div>
    );
}
