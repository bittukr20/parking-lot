const userRoutes = require("./user");
const parkingSlotRoutes = require("./parkingSlot");
const parkingSlotReservationRoutes = require("./parkingSlotReservation");

module.exports = async fastify => {
  fastify.register(userRoutes);
  fastify.register(parkingSlotRoutes);
  fastify.register(parkingSlotReservationRoutes);
};
