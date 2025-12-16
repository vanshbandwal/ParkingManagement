const Parking = require("../models/Parking_model.js");

const startParking = async (req, res) => {
  try {
    const { name, vehicleNumber, vehicleType, slotNumber, entryTime } =
      req.body;

    if (!name || !vehicleNumber || !vehicleType || !slotNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const { email } = req.user;
    console.log(email);

    // Check if slot is already active
    const existing = await Parking.findOne({
      slotNumber,
      isActive: true,
      email,
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Slot ${slotNumber} is already occupied`,
      });
    }

    const parkingEntry = new Parking({
      name,
      email,
      vehicleNumber,
      vehicleType,
      slotNumber,
      entryTime: entryTime || new Date(),
      isActive: true,
      paymentStatus: "pending",
    });

    await parkingEntry.save();

    res.status(201).json({
      success: true,
      message: "Parking started successfully",
      parkingEntry,
    });
  } catch (error) {
    console.error("Error starting parking:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getParking = async (req, res) => {
  try {
    const { email } = req.user;
    console.log(email);
    const data = await Parking.find({ email });
    res.status(201).json({
      success: true,
      data,
      message: "fatch data succesfully",
    });
  } catch (error) {
    console.log("Error in fetching the data of Parking", error);
  }
};
const exitParking = async (req, res) => {
  try {
    const { num } = req.body;
    const {email} = req.user 
    console.log(req.body);
    if (!num) {
      console.log("num is Not define");
      return res.status(500).json({
        success: false,
        message: "Unauthentic request",
      });
    }
    const existing = await Parking.findOne({ slotNumber: num, isActive: true ,email});
    if (!existing) {
      return res.json({
        success: false,
        message: "Spot is not active",
      });
    }
    existing.isActive = false;
    existing.exitTime = new Date();
    existing.paymentStatus = "completed";

    await existing.save();

    return res.json({
      success: true,
      message: "Parking exited successfully",
      existing,
    });
  } catch (error) {
    console.log("Error in handle exit spot", error);
  }
};
const userInfo = async (req, res) => {
  const { num } = req.query;
  const { email } = req.user;
  if (!num) {
    console.log("num is Not define");
    return res.status(500).json({
      success: false,
      message: "Unauthentic request",
    });
  }
  const spot = await Parking.findOne({
    slotNumber: num,
    isActive: true,
    email,
  });
  if (!spot) {
    return res.json({
      success: false,
      message: "Spot is not active",
    });
  }
  return res.json({
    success: true,
    message: "Spot is Active",
    spot,
  });
};
const getInfo = async (req, res) => {
  try {
    const { vehicleNumber } = req.params;
    console.log(vehicleNumber);
    const {email} = req.user

    const data = await Parking.find({ vehicleNumber ,email});

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json({ message: "Success", data,success:true});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { startParking, getParking, exitParking, userInfo, getInfo };
