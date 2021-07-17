const User = require("../models/Users");

async function validateEmail(email) {
  const data = await User.find({ email });
  if (data.length) {
    return true;
  }
  return false;
}

module.exports = {
  create: async (request, reply) => {
    try {
      const user = request.body;
      const exist = await validateEmail(user.email);
      if (!exist) {
        const newUser = await User.create(user);
        return reply.code(201).send(newUser);
      }
      return reply
        .code(400)
        .send({ message: "user with same email already exist" });
    } catch (e) {
      return reply.code(500).send(e);
    }
  },

  fetch: async (request, reply) => {
    try {
      const users = await User.find({});
      reply.code(200).send(users);
    } catch (e) {
      reply.code(500).send(e);
    }
  },

  get: async (request, reply) => {
    try {
      const userId = request.params.id;
      const user = await User.findById(userId);
      reply.code(200).send(user);
    } catch (e) {
      reply.code(500).send(e);
    }
  }
};
