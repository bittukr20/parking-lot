const mongoose = require("mongoose");

const { Schema } = mongoose;

const parkingSlotReservationSchema = new Schema({
  userEmail: { type: String, required: true },
  parkingNumber: { type: String, required: true },
  status: { type: String, required: true }
});

const ParkingSlotReservation = mongoose.model(
  "parkingSlotReservation",
  parkingSlotReservationSchema
);

module.exports = ParkingSlotReservation;
