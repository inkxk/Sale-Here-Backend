const { Rooms } = require("../../model/rooms");
const { resolvers } = require("./room");

jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("test-room-id"),
}));

describe("createRoom mutation resolver", () => {
  it("should create a room and return successful:true", async () => {
    const roomName = "Test Room";
    
    const saveMock = jest.fn().mockResolvedValueOnce({ id: "test-room-id", roomName });
    Rooms.prototype.save = saveMock;

    const result = await resolvers.Mutation.createRoom(null, { roomName });

    expect(saveMock).toHaveBeenCalledWith();
    expect(result).toEqual({ successful: true });
  });

  it("should return successful:false if room creation fails", async () => {
    const roomName = "Test Room";
    const errorMessage = "Failed to create room";
    
    const saveMock = jest.fn().mockRejectedValueOnce(new Error(errorMessage));
    Rooms.prototype.save = saveMock;

    const result = await resolvers.Mutation.createRoom(null, { roomName });

    expect(saveMock).toHaveBeenCalledWith();
    expect(result).toEqual({ successful: false });
  });
});