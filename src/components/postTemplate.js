import { useState } from "react";

export default function PostTemplate({ name, apiUrl, fields }) {
  const [formData, setFormData] = useState(
    Object.keys(fields).reduce((acc, key) => (
      { ...acc, [key]: Array.isArray(fields[key]) ? fields[key][0] : fields[key] === "int" ? 0 : "" } 
    ), {})
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (value, key, type) => {
    if (type === "int") {
      value = value.replace(/[^0-9]/g, ""); // Only allow numbers
    }
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("Loading...");
    console.log(JSON.stringify(formData));
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setMessage("Data submitted successfully!");
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting data:", error.message);
      setMessage("Error submitting data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <big className="text-xl font-bold mb-4">{name} </big>
      <div className="inputs">
        {Object.entries(fields).map(([key, type]) => (
          Array.isArray(type) ? 
          <div>
            <label>Enter {key}</label>
            <br />
            <select>  
              {type.map((option) => (
                <option value={option}>{option}</option>
              ))}
              
              onChange={(e) => handleChange(e.target.label, key, "string")}
            </select>
          </div>
          :
          <div>
            <label>Enter {key}</label>
            <br />
            <input
              key={key}
              type={type === "int" ? "number" : type}
              value={formData[key]}
              onChange={(e) => handleChange(e.target.value, key, type)}
              placeholder={`Enter ${key}`}
              className="border p-2 mr-2"
            /> 
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} disabled={loading}>Submit</button>

      {message && <p className="text-green-500"> {message}</p>}
    </div>
  );
}