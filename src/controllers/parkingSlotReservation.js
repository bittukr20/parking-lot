const NodeCache = require("node-cache");

const memCache = new NodeCache({ checkperiod: 5 });
const ParkingSlot = require("../models/ParkingSlot");
const ParkingSlotReservation = require("../models/ParkingSlotReservation");
const Users = require("../models/Users");

memCache.on("expired", async function (key, value) {
  await ParkingSlotReservation.findByIdAndDelete(value.id);
});

async function getAllBookedSlotsNumber() {
  const reserved = await ParkingSlotReservation.find({
    status: "CONFIRMED"
  });
  const booked = memCache.keys();
  return [...booked, ...reserved.map(val => val.parkingNumber)];
}

async function getAllSlotsCount() {
  const allSlotsCount = ParkingSlot.count({});
  return allSlotsCount;
}

function putBookingInCache({ key, value, expiryInSec }) {
  memCache.set(key, value, expiryInSec);
}

async function getSlotForBooking(email) {
  const { type } = await Users.findOne({ email });
  const allBookedSlots = await getAllBookedSlotsNumber();
  const allSlotCount = await getAllSlotsCount();
  let expiryInSec = 30 * 60; // This can be taken as input from env vars
  if (allBookedSlots.length > allSlotCount / 2) {
    expiryInSec = 15 * 60; // This can be taken as input from env vars
  }
  const slot = await ParkingSlot.findOne({
    type,
    parkingNumber: { $nin: allBookedSlots }
  });
  if (!slot && type === "RESERVED") {
    const generalSlot = await ParkingSlot.findOne({
      type: "GENERAL",
      parkingNumber: { $nin: allBookedSlots }
    });
    if (!generalSlot) {
      return null;
    }
    return { slot: generalSlot, expiryInSec };
  }

  return { slot, expiryInSec };
}

module.exports = {
  create: async (request, reply) => {
    try {
      const { email } = request.body;
      const slotForBooking = await getSlotForBooking(email);
      if (!slotForBooking) {
        return reply.code(404).send({ message: "All Slots Full" });
      }
      const {
        slot: { parkingNumber },
        expiryInSec
      } = slotForBooking;
      const response = await ParkingSlotReservation.create({
        parkingNumber,
        userEmail: email,
        status: "INITIATED"
      });
      putBookingInCache({
        key: parkingNumber,
        value: { parkingNumber, userEmail: email, id: response.id },
        expiryInSec
      });
      return reply.code(200).send(response);
    } catch (e) {
      return reply.code(500).send(e);
    }
  },
  fetch: async (request, reply) => {
    try {
      const { email } = request.query;
      const bookedSlots = await ParkingSlotReservation.find({
        status: { $in: ["CONFIRMED", "INITIATED"] },
        ...(email && { userEmail: email })
      });
      return reply.code(200).send(bookedSlots);
    } catch (e) {
      return reply.code(500).send(e);
    }
  },
  confirm: async (request, reply) => {
    try {
      const { reservationId } = request.params;
      const { email, parkingNumber } = request.body;
      const reservation = memCache.get(parkingNumber);
      if (!reservation) {
        return reply.code(419).send({ message: "RESERVATION EXPIRED" });
      }
      if (email === reservation.userEmail && reservationId === reservation.id) {
        await ParkingSlotReservation.findByIdAndUpdate(reservation.id, {
          parkingNumber,
          userEmail: email,
          status: "CONFIRMED"
        });
        const response = await ParkingSlotReservation.findById(reservation.id);
        memCache.del(parkingNumber);
        return reply.code(200).send(response);
      }
      return reply
        .code(400)
        .send({ message: "invalid email or parkingNumber" });
    } catch (e) {
      return reply.code(500).send(e);
    }
  }
};
