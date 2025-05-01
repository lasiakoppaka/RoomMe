import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    age: "",
    cleanliness: "",
    bedtime: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          age: Number(formData.age),
          cleanliness: Number(formData.cleanliness),
          bedtime: Number(formData.bedtime)
        })
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setResult(data.message);
    } catch (error) {
      console.error("Request error:", error);
      setResult("ERROR: Failed to connect to the backend.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>RoomMe Match Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Cleanliness (1–10):
          <input
            type="number"
            name="cleanliness"
            value={formData.cleanliness}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Bedtime (24-hour format):
          <input
            type="number"
            name="bedtime"
            value={formData.bedtime}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Check Match</button>
      </form>
      {result && <h2>Result: {result}</h2>}
    </div>
  );
}

export default App;
