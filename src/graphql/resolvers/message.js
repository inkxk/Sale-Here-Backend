const { v4: uuidv4 } = require('uuid');
const { Messages } = require('../../model/messages');
const { Rooms } = require('../../model/rooms');

const resolvers = {
  Query: {
    messages: (parent, { roomId }) => {
      return Messages.find({ roomId: roomId })
        .then (messages => {
          console.log(messages);
          return messages;
        })
        .catch (error => {
          console.error("queryMessages error:", error)
      });
    }
  },
  Mutation: {
    sendMessage: async (parent, { body, senderName, roomId }) => {
      const queryRoom = await Rooms.find({ id: roomId })
        .then (room => {
          return room
        })
        .catch (error => {
          console.error("queryRoomId error:", error)
      });

      if (queryRoom.length == 0) {
        console.error("sendMessage error: room not found")
        return {
          successful: false
        };
      }

      const messageObject = new Messages({
        id: uuidv4(),
        body: body,
        image: '',
        from: {
          name: senderName
        },
        roomId: roomId
      });

      return messageObject.save()
        .then ((result) => {
          console.log("sendMessage result:", result);
          return {
            successful: true
          };
        })
        .catch (error => {
          console.error("sendMessage error:", error)
          return {
            successful: false
          };
      });
    }
  }
};

module.exports = {
  resolvers
}