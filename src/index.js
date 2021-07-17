// import fastify & mongoose
const fastify = require("fastify");
const swagger = require("fastify-swagger");
const mongoose = require("mongoose");
const routes = require("./routes");

// initialized Fastify App
const app = fastify();

// connected fastify to mongoose
try {
  // URL can be taken as input from env vars
  mongoose.connect("mongodb://localhost:27017/test");
} catch (e) {
  console.error(e);
}
// Swagger docs
app.register(swagger, {
  routePrefix: "/documentation",
  swagger: {
    info: {
      title: "Parking Lot API's",
      description: "API Docs for the Parking Lot Service",
      version: "0.1.0"
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here"
    },
    consumes: ["application/json"],
    produces: ["application/json"]
  },
  exposeRoute: true
});

app.register(routes, { prefix: "v1" });

// set application listening on port 5000 of localhost
app.listen(5000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});
