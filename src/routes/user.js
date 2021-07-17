const { create, fetch, get } = require("../controllers/users");
const { createSchema, fetchSchema, getSchema } = require("../schemas/users");

module.exports = async fastify => {
  fastify.route({
    method: "POST",
    url: "/users",
    schema: createSchema,
    handler: create
  });

  fastify.route({
    method: "GET",
    url: "/users",
    schema: fetchSchema,
    handler: fetch
  });

  fastify.route({
    method: "GET",
    url: "/users/:id",
    schema: getSchema,
    handler: get
  });
};
