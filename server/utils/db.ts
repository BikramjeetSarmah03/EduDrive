import mongoose from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI || "";

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI).then((data) => {
      console.log(`Database connected to host: ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(() => {
      connectDatabase();
    }, 5000);
  }
};

export default connectDatabase;
