exports.createSchema = {
  tags: ["Parking-Slot"],
  summary: "This API is used to Add Parking slots",
  description: "This API is used to Add Parking slots",
  body: {
    type: "object",
    required: ["parkingNumber", "type"],
    additionalProperties: false,
    properties: {
      parkingNumber: { type: "string", minLength: 1 },
      type: { type: "string", enum: ["RESERVED", "GENERAL"] }
    }
  },
  response: {
    201: {
      type: "object",
      properties: {
        _id: { type: "string" },
        parkingNumber: { type: "string" },
        type: { type: "string" }
      }
    }
  }
};

exports.fetchSchema = {
  tags: ["Parking-Slot"],
  summary: "This API is used to Get All Parking slots",
  description: "This API is used Get All Parking slots, with/without filter",
  query: {
    type: "object",
    properties: {
      status: { type: "string", enum: ["AVAILABLE", "OCCUPIED"] }
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
          type: { type: "string" }
        }
      }
    }
  }
};
