import Exception from "../exceptions/Exception.js";
import { print, OutputType } from "../helpers/prints.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";

const login = async ({ email, password }) => {
  print("User login in repository", OutputType.INFORMATION);
};

const register = async ({ name, email, password, phoneNumber, address }) => {
  // print(
  //   `Register user in user repositories: name: ${name} email: ${email} password: ${password} phoneNumber ${phoneNumber} address ${address}`,
  //   OutputType.INFORMATION
  // );
  try {
    debugger;
    const exitingUser = await User.findOne({ email }).exec();
    if (!!exitingUser) {
      //check not null
      console.log(`User exited` + Exception.USER_EXIST);
      throw new Exception(Exception.USER_EXIST);
    }
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      phoneNumber,
      address,
    });
    console.log(`repository` + newUser);
    // const issMatched = await bcrypt.compare(password, exitingUser.password);
    // if(issMatched){

    // }
  } catch (exceptions) {
    debugger;
    console.log(exceptions);
    throw new Exception(Exception.CANNOT_REGISTER_USER);
  }
};
export default {
  login,
  register,
};
