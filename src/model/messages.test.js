const { Messages } = require("./messages");

describe("Messages Schema", () => {
  it("should create a Mongoose model with correct schema", () => {
    const messagesSchema = Messages.schema.obj;

    expect(messagesSchema).toHaveProperty("id", {
      type: String,
      required: true,
      unique: true,
    });
    expect(messagesSchema).toHaveProperty("body", {
      type: String,
      required: true,
    });
    expect(messagesSchema).toHaveProperty("image", {
      type: String,
      required: false,
    });
		expect(messagesSchema).toHaveProperty("from", expect.objectContaining({
      name: {
        type: String,
        required: true,
      },
    }), expect.anything());
    expect(messagesSchema).toHaveProperty("roomId", {
      type: String,
      required: true,
    });
    expect(Messages.modelName).toBe("Messages");
  });
});