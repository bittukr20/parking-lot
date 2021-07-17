exports.createSchema = {
  tags: ["Reservation/Bookings"],
  summary: "This API is used to Book/Reserve a parking slot",
  description: "This API is used to Book/Reserve a parking slot",
  body: {
    type: "object",
    required: ["email"],
    additionalProperties: false,
    properties: {
      email: { type: "string", format: "email" }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        _id: { type: "string" },
        parkingNumber: { type: "string" },
        status: { type: "string" }
      }
    }
  }
};

exports.fetchSchema = {
  tags: ["Reservation/Bookings"],
  summary: "This API is used to get All Reservations/Bookings",
  description: "This API is used to get All Reservations/Bookings",
  query: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" }
    }
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          _id: { type: "string" },
          parkingNumber: { type: "string" },
          status: { type: "string" }
        }
      }
    }
  }
};

exports.confirmSchema = {
  tags: ["Reservation/Bookings"],
  summary: "This API is used to confirm a reserved slot",
  description: "This API is used to confirm a reserved slot",
  body: {
    type: "object",
    required: ["email"],
    additionalProperties: false,
    properties: {
      email: { type: "string", format: "email" },
      parkingNumber: { type: "string", minLength: 1 }
    }
  },
  response: {
    200: {
      type: "object",
      properties: {
        _id: { type: "string" },
        parkingNumber: { type: "string" },
        status: { type: "string" }
      }
    }
  }
};
