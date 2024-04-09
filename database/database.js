import mongoose from "mongoose";
import { print, OutputType } from "../helpers/prints.js";
import Exception from "../exceptions/Exception.js";

mongoose.set(`strictQuery`, true);
async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGODB_URI);
    print("Connect database successfully", OutputType.SUCCESS);
    return connection;
  } catch (error) {
    const { code } = error;
    print(error, OutputType.ERROR);
    if (code == 8000) {
      throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD);
    } else if (code == "ENOTFOUND") {
      throw new Exception(Exception.WRONG_DB_CONNECTION_STRING);
    }
    debugger;
    throw new Exception(Exception.CANNOT_CONNECT_MONGODB);
  }
}

export default connect;
