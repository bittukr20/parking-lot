const { create, fetch } = require("../controllers/parkingSlots");
const { createSchema, fetchSchema } = require("../schemas/parkingSlot");

module.exports = async fastify => {
  fastify.route({
    method: "POST",
    url: "/parking-slots",
    schema: createSchema,
    handler: create
  });

  fastify.route({
    method: "GET",
    url: "/parking-slots",
    schema: fetchSchema,
    handler: fetch
  });
};
