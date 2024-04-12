const { v4: uuidv4 } = require("uuid");
const { Messages } = require("../../model/messages");
const { Rooms } = require("../../model/rooms");
const { resolvers } = require("./message");

jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("test-message-id"),
}));

describe("Message resolvers", () => {
  describe("messages query resolver", () => {
    it("should return messages for a given room ID", async () => {
      const roomId = "test-room-id";
      const expectedMessages = [
        { id: "1", body: "Message 1" },
        { id: "2", body: "Message 2" },
      ];

      Messages.find = jest.fn().mockResolvedValueOnce(expectedMessages);

      const result = await resolvers.Query.messages(null, { roomId });

      expect(Messages.find).toHaveBeenCalledWith({ roomId });
      expect(result).toEqual(expectedMessages);
    });

    it("should handle errors when finding messages", async () => {
      const roomId = "test-room-id";
      const errorMessage = "Failed to find messages";

      Messages.find = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

      const result = await resolvers.Query.messages(null, { roomId });

      expect(Messages.find).toHaveBeenCalledWith({ roomId });
      expect(result).toBeUndefined();
    });
  });

  describe("sendMessage mutation resolver", () => {
    it("should send a message and return successful:true", async () => {
      const body = "Test message";
      const senderName = "John Doe";
      const roomId = "test-room-id";
      const expectedMessage = { id: "test-message-id", body, from: { name: senderName }, roomId };

      Rooms.find = jest.fn().mockResolvedValueOnce([{ id: roomId }]);

      Messages.prototype.save = jest.fn().mockResolvedValueOnce(expectedMessage);

      const result = await resolvers.Mutation.sendMessage(null, { body, senderName, roomId });

      expect(Rooms.find).toHaveBeenCalledWith({ id: roomId });
      expect(Messages.prototype.save).toHaveBeenCalledWith();
      expect(result).toEqual({ successful: true });
    });

    it("should handle errors when finding room", async () => {
      const body = "Test message";
      const senderName = "John Doe";
      const roomId = "test-room-id";
			const error = new Error("Failed to find room");

			console.log = jest.fn();
      Rooms.find = jest.fn().mockRejectedValueOnce(error);

      const result = await resolvers.Mutation.sendMessage(null, { body, senderName, roomId });

      expect(Rooms.find).toHaveBeenCalledWith({ id: roomId });
      expect(result).toEqual({ successful: false });
      expect(console.log).toHaveBeenCalledWith("queryRoomId error:", error);
    });

    it("should handle errors when sending message", async () => {
      const body = "Test message";
      const senderName = "John Doe";
      const roomId = "test-room-id";
      const errorMessage = "Failed to save message";

      Rooms.find = jest.fn().mockResolvedValueOnce([{ id: roomId }]);

      Messages.prototype.save = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

      const result = await resolvers.Mutation.sendMessage(null, { body, senderName, roomId });

      expect(Rooms.find).toHaveBeenCalledWith({ id: roomId });
      expect(Messages.prototype.save).toHaveBeenCalledWith();
      expect(result).toEqual({ successful: false });
    });

    it("should return successful:false if room not found", async () => {
      const body = "Test message";
      const senderName = "John Doe";
      const roomId = "test-room-id";

      Rooms.find = jest.fn().mockResolvedValueOnce([]);

      const result = await resolvers.Mutation.sendMessage(null, { body, senderName, roomId });

      expect(Rooms.find).toHaveBeenCalledWith({ id: roomId });
      expect(result).toEqual({ successful: false });
    });
  });
});
