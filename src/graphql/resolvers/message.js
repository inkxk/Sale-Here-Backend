import set from 'lodash/set';
import get from 'lodash/get';
import uuid from 'uuid/v1';

import mock from '../../mock';

export default {
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
