import { print, OutputType } from "../helpers/prints.js";

export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = "Wrong database's userName, password";
  static WRONG_DB_CONNECTION_STRING = "Wrong url";
  static CANNOT_CONNECT_MONGODB = "Cannot connect to Mongodb";
  static USER_EXIST = "User already exists";
  static CANNOT_REGISTER_USER = "Cannot register user";
  static WRONG_USERNAME_OR_PASSWORD = "Wrong username and password";
  constructor(message) {
    super(message);
    print(message, OutputType.ERROR);
  }
}
