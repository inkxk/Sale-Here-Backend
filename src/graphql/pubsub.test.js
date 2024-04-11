const { PubSub } = require("apollo-server");

jest.mock("apollo-server", () => ({
  PubSub: jest.fn(() => ({
    publish: jest.fn(),
    subscribe: jest.fn(),
  })),
}));

describe("PubSub", () => {
  it("should create a PubSub instance", () => {
    const pubsub = new PubSub();

    expect(PubSub).toHaveBeenCalledTimes(1);
    expect(typeof pubsub).toBe("object");
  });
});