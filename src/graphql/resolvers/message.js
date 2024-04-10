const set = require('lodash/set');
const get = require('lodash/get');
const uuid = require('uuid/v1');

const mock = require('../../mock');

const messagesResolvers = {
  Query: {
    messages: (parent, { roomName }) => {
      const msgs = get(mock, `rooms.${roomName}.messages`, []);
      return msgs;
    }
  },
  Mutation: {
    sendMessage: (parent, { roomName, message }) => {
      set(mock, `rooms.${roomName}`, {
        messages: [
          ...get(mock, `rooms.${roomName}.messages`, []),
          { id: uuid(), body: message }
        ]
      });
      return {
        successful: true
      };
    }
  }
};

module.exports = {
  messagesResolvers
}