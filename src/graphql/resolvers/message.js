const fs = require('fs');
const path = require("path");
const { PubSub } = require("apollo-server");
const { v4: uuidv4 } = require("uuid");
const { Messages } = require("../../model/messages");
const { Rooms } = require("../../model/rooms");

const pubsub = new PubSub();

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

      // import image
      let imageContent = "";
      fs.readdirSync(path.join(__dirname, "../../image/")).forEach(file => {
        // encode image to base64
        imageContent = fs.readFileSync(path.join(__dirname, `../../image/${file}`), {encoding: 'base64'});
      });

      const messageObject = new Messages({
        id: uuidv4(),
        body: body,
        image: imageContent,
        from: {
          name: senderName
        },
        roomId: roomId
      });

      return messageObject.save()
        .then ((result) => {
          console.log("sendMessage result:", result);

          // publish message to subscriber
          pubsub.publish("new_message", {
            newMessage: messageObject
          });

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
  },
  Subscription: {
    newMessage: {
      subscribe(parent, { roomName }) { 
        return pubsub.asyncIterator("new_message") 
      }
    },
  }
};

module.exports = {
  resolvers
}