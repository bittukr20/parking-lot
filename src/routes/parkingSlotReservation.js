const {
  create,
  fetch,
  confirm
} = require("../controllers/parkingSlotReservation");
const {
  createSchema,
  fetchSchema,
  confirmSchema
} = require("../schemas/parkingSlotReservation");

module.exports = async fastify => {
  fastify.route({
    method: "POST",
    url: "/reservations",
    schema: createSchema,
    handler: create
  });

  fastify.route({
    method: "GET",
    url: "/reservations",
    schema: fetchSchema,
    handler: fetch
  });

  fastify.route({
    method: "POST",
    url: "/reservations/:reservationId/confirm",
    schema: confirmSchema,
    handler: confirm
  });
};
