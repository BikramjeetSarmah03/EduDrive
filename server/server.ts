import app from "./app";
import connectDatabase from "./utils/db";

connectDatabase();

const PORT = process.env.PORT;
// create server
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
