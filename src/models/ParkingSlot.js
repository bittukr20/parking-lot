const mongoose = require("mongoose");

const { Schema } = mongoose;

const parkingSlotSchema = new Schema({
  parkingNumber: { type: String, required: true },
  type: { type: String, required: true }
});

const ParkingSlot = mongoose.model("parkingSlot", parkingSlotSchema);

module.exports = ParkingSlot;
