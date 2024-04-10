const uuidv4 = require('uuid/v4');
const { Rooms } = require('../../model/rooms');

const resolvers = {
  Mutation: {
    createRoom: (parent, { roomName }) => {			
      const roomObject = new Rooms({
        id: uuidv4(),
        roomName: roomName
      })

      return roomObject.save()
        .then ((result) => {
          console.log("createRoom result:", result);
          return {
            successful: true
          };
        })
        .catch (err => {
          console.error("createRoom error:", err)
          return {
            successful: false
          };
      });
    },
  }
};

module.exports = {
  resolvers
}