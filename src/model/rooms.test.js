const { Rooms } = require("./rooms");

describe("Rooms Schema", () => {
  it("should create a Mongoose model with correct schema", () => {
    const roomsSchema = Rooms.schema.obj;
    expect(roomsSchema).toHaveProperty("id", {
      type: String,
      required: true,
      unique: true,
    });
    expect(roomsSchema).toHaveProperty("roomName", {
      type: String,
      required: true,
      unique: true,
    });
    expect(Rooms.modelName).toBe("Rooms");
  });
});