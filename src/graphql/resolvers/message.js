const { v4: uuidv4 } = require('uuid');
const { Messages } = require('../../model/messages');
const { Rooms } = require('../../model/rooms');

const resolvers = {
  Query: {
    messages: (parent, { roomId }) => {
      return Messages.find({ roomId: roomId })
        .then (messages => {
          console.log("queryMessages result:", messages);
          return messages;
        })
        .catch (error => {
          console.log("queryMessages error:", error)
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
          console.log("queryRoomId error:", error)
      });

      if (queryRoom == undefined || queryRoom.length == 0) {
        console.log("sendMessage error: room not found")
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
          console.log("sendMessage error:", error)
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