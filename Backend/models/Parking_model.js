const mongoose = require("mongoose");

const ParkingSchema = new mongoose.Schema({
  parkingId: {
    type: Number,
    unique: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },
email:{
  type:String,
  required:true
},
  vehicleNumber: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },

  vehicleType: {
    type: String,
    enum: ["car", "bike", "truck", "other"],
    required: true,
  },

  slotNumber: {
    type: Number,
    required: true,
  },

  entryTime: {
    type: Date,
    default: Date.now,
  },

  exitTime: {
    type: Date,
    default: null,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  paymentStatus: {
    type: String,
    default: "pending",
  },
  

  totalAmount: {
    type: Number,
    default: 0
  }
});


ParkingSchema.pre("save", async function (next) {
  if (this.isNew) {
    const last = await this.constructor.findOne().sort("-parkingId");

    this.parkingId = last ? last.parkingId + 1 : 1;
  }
});


module.exports = mongoose.model("Parking", ParkingSchema);
