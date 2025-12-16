import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function ParkingUI() {
  const spots = Array.from({ length: 50 }, (_, i) => i + 1);

  const [parkingData, setParkingData] = useState([]);

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/parking",
          { withCredentials: true }
        );
        setParkingData(res.data.data);
        console.log("data", res.data.data)
      } catch (error) {
        console.log("Error fetching parking data:", error);
      }
    };

    fetchParkingData();
  }, []);

  const getSlotColor = (num) => {
    const isActiveSlot = parkingData.some(
      (item) => item.slotNumber === num && item.isActive === true
    );

    return isActiveSlot
      ? "bg-red-500 text-white" // Full
      : "bg-green-500 text-white"; // Empty
  };


  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">

        <h1 className="text-3xl font-bold mb-6">Smart Parking App</h1>

        <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 space-y-6">

          <div className="grid grid-cols-5 gap-4 bg-white p-4 rounded-2xl shadow">
            <div className="col-span-5 text-center text-lg font-semibold mb-2">
              Parking Slots
            </div>

            {spots.map((num) => (
              <Link to={`/formdata/${num}`} key={num}>
                <div
                  className={`${getSlotColor(
                    num
                  )} h-14 flex items-center justify-center rounded-xl font-semibold`}
                >
                  {num}
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
