import axios from 'axios';
import React, { useState } from 'react'

const Inform = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");
  const handleSearch = async () => {
    if (!vehicleNumber.trim()) {
      setError("Please enter a vehicle number");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/api/parking/info/${vehicleNumber}`,
        {
          withCredentials: true
        }
      );
      setInfo(res.data.data);
      if(res.data.success){
        setVehicleNumber("")
      }
      console.log(res.data)
      setError("");
    } catch (err) {
      setInfo(null);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };
  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>Search Vehicle Information</h2>

      <input
        type="text"
        placeholder="Enter Vehicle Number"
        value={vehicleNumber}
        onChange={(e) => setVehicleNumber(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          marginBottom: "10px",
          borderRadius: "5px",
          border: "1px solid gray",
        }}
      />

      <button
        onClick={handleSearch}
        style={{
          width: "100%",
          padding: "10px",
          background: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>
          {error}
        </p>
      )}

      {info && (
        <div
          style={{
            marginTop: "20px",
            background: "#f7f7f7",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Vehicle Records</h3>

          {info.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "15px",
                marginBottom: "15px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <p><b>Name:</b> {item.name}</p>
              <p><b>Vehicle Number:</b> {item.vehicleNumber}</p>
              <p><b>Vehicle Type:</b> {item.vehicleType}</p>
              <p><b>Slot Number:</b> {item.slotNumber}</p>
              <p><b>Entry Time:</b> {item.entryTime}</p>
              <p><b>Exit Time:</b> {item.exitTime || "Not exited yet"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default Inform