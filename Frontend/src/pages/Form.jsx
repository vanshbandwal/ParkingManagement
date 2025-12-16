import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ParkingForm() {
  const { num } = useParams();
  const navigate = useNavigate()
  const [show, setShow] = useState(true)
  const [formData, setFormData] = useState({
    parkingId: "",
    name: "",
    vehicleNumber: "",
    vehicleType: "",
    slotNumber: num ?? "",
    entryTime: "",
  });

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        'http://localhost:3000/api/parking/exit',
        { num: Number(num) },
        { withCredentials: true }
      );
      if (res.data.success) {
        navigate('/')
      }
      else {
        console.log("Error in handling the exit")
      }
    } catch (error) {
      console.log("someThing went wrong", error)
    }
  }

  useEffect(() => {
    const now = new Date();
    const localDatetime = now.toISOString().slice(0, 16);

    setFormData((prev) => ({
      ...prev,
      slotNumber: num ?? "",
      entryTime: localDatetime,
    }));
  }, [num]);

  useEffect(() => {
    const fetchExistingData = async () => {
      let res = await axios.get("http://localhost:3000/api/parking/user", {
        params: { num: Number(num) },
        withCredentials: true,
      });

      console.log(res.data);
      if (res.data.success) {
        setFormData({
          name: res.data.spot.name,
          vehicleNumber: res.data.spot.vehicleNumber,
          vehicleType: res.data.spot.vehicleType,
          entryTime: res.data.spot.entryTime
        })
        setShow(false)
      }
    }
    fetchExistingData()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/parking/",
        formData,
        { withCredentials: true }
      );

      // SUCCESS
      if (res.data.success) {
        alert(res.data.message);
        setFormData({
          name: "",
          vehicleNumber: "",
          vehicleType: "",
          entryTime: "",
        })
        navigate('/')
      }
    }
    catch (error) {
      console.log("ERROR:", error);
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Parking Entry Form for {num}</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Driver Name */}
          <div>
            <label className="block font-medium mb-1">Driver Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border"
              placeholder="Enter driver name"
              required
            />
          </div>

          {/* Vehicle Number */}
          <div>
            <label className="block font-medium mb-1">Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border uppercase"
              placeholder="MH12 AB 1234"
              required
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block font-medium mb-1">Vehicle Type</label>
            <select
              name="vehicleType"
              value={formData.vehicleType || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border"
              required
            >
              <option value="">Select Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="truck">Truck</option>
              <option value="other">Other</option>
            </select>
          </div>


          {/* Entry Time */}
          <div>
            <label className="block font-medium mb-1">Entry Time</label>
            <input
              type="datetime-local"
              name="entryTime"
              value={formData.entryTime || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border"
              required
            />
          </div>

          {
            show === true ? <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              Submit Entry
            </button> : <button
              type="button"
              onClick={handleDelete}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition"
            >
              Submit Entry
            </button>
          }
          <div>

          </div>
        </form>
      </div>
    </div>
  );
}
