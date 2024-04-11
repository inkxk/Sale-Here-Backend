const mongoose = require("mongoose");
const { connectDB } = require("./db");

describe("connectDB function", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

  it("should connect to the database", async () => {
    mongoose.connect = jest.fn(() => Promise.resolve());

    mongoose.connection.once = jest.fn((event, callback) => {
      if (event === "open") callback();
    });

    console.log = jest.fn();

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_ENDPOINT, expect.objectContaining({
      	useNewUrlParser: true,
    	  useUnifiedTopology: true,
      })
    );
    expect(console.log).toHaveBeenCalledWith(
      `Database connected: ${process.env.MONGO_ENDPOINT}`
    );
  });

  it("should handle connection errors", async () => {
    const error = new Error("Connection error");
    mongoose.connect = jest.fn(() => Promise.reject(error));

    process.exit = jest.fn();

    console.error = jest.fn();

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_ENDPOINT, expect.any(Object));
    expect(console.error).toHaveBeenCalledWith("Connection error");
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  it("should handle database connection 'error' event", async () => {
		const error = new Error("Connection error");

    mongoose.connect = jest.fn(() => Promise.resolve());

    mongoose.connection.on = jest.fn((event, callback) => {
      if (event === "error") {
        callback(error.message);
      }
    });

    console.error = jest.fn();

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_ENDPOINT, expect.any(Object));
    expect(console.error).toHaveBeenCalledWith(`connection error: ${error.message}`);
  });
});