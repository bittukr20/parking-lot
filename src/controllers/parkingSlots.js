const ParkingSlot = require("../models/ParkingSlot");
const ParkingSlotReservation = require("../models/ParkingSlotReservation");

async function validateCode(parkingNumber) {
  const data = await ParkingSlot.find({ parkingNumber });
  if (data.length) {
    return true;
  }
  return false;
}

async function getAvailableParkingSlots() {
  const reservedSlots = await ParkingSlotReservation.find({
    status: { $in: ["CONFIRMED", "INITIATED"] }
  });
  const slotNumbers = reservedSlots.map(val => val.parkingNumber);
  return ParkingSlot.find({
    parkingNumber: { $nin: slotNumbers }
  });
}

async function getOccupiedParkingSlots() {
  const reservedSlots = await ParkingSlotReservation.find({
    status: { $in: ["CONFIRMED", "INITIATED"] }
  });
  const slotNumbers = reservedSlots.map(val => val.parkingNumber);
  return ParkingSlot.find({
    parkingNumber: { $in: slotNumbers }
  });
}

module.exports = {
  create: async (request, reply) => {
    try {
      const parkingSlot = request.body;
      const exist = await validateCode(parkingSlot.parkingNumber);
      if (!exist) {
        const newSlot = await ParkingSlot.create(parkingSlot);
        return reply.code(201).send(newSlot);
      }
      return reply
        .code(400)
        .send({ message: "Slot with same Code already exist" });
    } catch (e) {
      return reply.code(500).send(e);
    }
  },

  fetch: async (request, reply) => {
    try {
      const { status } = request.query;
      if (status) {
        // eslint-disable-next-line max-depth
        if (status === "AVAILABLE") {
          const occupiedSlots = await getAvailableParkingSlots();
          return reply.code(200).send(occupiedSlots);
        }
        const occupiedSlots = await getOccupiedParkingSlots();
        return reply.code(200).send(occupiedSlots);
      }
      const parkingSlots = await ParkingSlot.find({});
      return reply.code(200).send(parkingSlots);
    } catch (e) {
      return reply.code(500).send(e);
    }
  }
};
