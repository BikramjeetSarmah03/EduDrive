import app from "./app";
import cloudinaryConfig from "./utils/cloudinary";
import connectDatabase from "./utils/db";

cloudinaryConfig();
connectDatabase();

const PORT = process.env.PORT;
// create server
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
