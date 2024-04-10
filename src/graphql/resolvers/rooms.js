const set = require('lodash/set');
const get = require('lodash/get');
const uuid = require('uuid/v4');

const mock = require('../../mock');

const roomsResolvers = {
  Mutation: {
    createRoom: (parent, { roomName }) => {
      set(`rooms.${roomName}`, {
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
    roomsResolvers
}