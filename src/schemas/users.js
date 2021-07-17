exports.createSchema = {
  tags: ["Users"],
  summary: "This API is used to Register User",
  description: "This API is used to Register User",
  body: {
    type: "object",
    required: ["name", "email", "type"],
    additionalProperties: false,
    properties: {
      name: { type: "string", minLength: 3 },
      email: { type: "string", format: "email" },
      type: { type: "string", enum: ["RESERVED", "GENERAL"] }
    }
  },
  response: {
    201: {
      type: "object",
      properties: {
        _id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        type: { type: "string" }
      }
    }
  }
};

exports.fetchSchema = {
  tags: ["Users"],
  summary: "This API is used to get all Registered User",
  description: "This API is used to get all Registered User",
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          email: { type: "string" },
          type: { type: "string" }
        }
      }
    }
  }
};

exports.getSchema = {
  tags: ["Users"],
  summary: "This API is used to get specific User",
  description: "This API is used to get specific User",
  response: {
    200: {
      type: "object",
      properties: {
        _id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        type: { type: "string" }
      }
    }
  }
};
