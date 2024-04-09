import Exception from "../exceptions/Exception.js";
import { print, OutputType } from "../helpers/prints.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

const login = async ({ email, password }) => {
  console.log("Login user in user repositories");
};

const register = async ({ name, email, password, phoneNumber, address }) => {
  // console.log(
  //   `Register user in user repositories: name: ${name} email: ${email} password: ${password} phoneNumber ${phoneNumber} address ${address}`
  // );
  try {
    const exitingUser = await User.findOne({ email }).exec();
    if (!!exitingUser) {
      throw new Exception(Exception.USER_EXIST);
    }
    const hashPassword = await bcrypt.hash();
    // const issMatched = await bcrypt.compare(password, exitingUser.password);
    // if(issMatched){

    // }
  } catch (exceptions) {}
};
export default {
  login,
  register,
};
