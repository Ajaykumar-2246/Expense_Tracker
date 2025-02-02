import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("MongoDB sucessfully Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export { connectDB };
