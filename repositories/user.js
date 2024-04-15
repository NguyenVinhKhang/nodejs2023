import Exception from "../exceptions/Exception.js";
import { print, OutputType } from "../helpers/prints.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async ({ email, password }) => {
  // print("User login in repository", OutputType.INFORMATION);
  let exitingUser = await User.findOne({ email }).exec();
  if (exitingUser) {
    let isMatch = await bcrypt.compare(password, exitingUser.password);
    if (!!isMatch) {
      let token = jwt.sign({ exitingUser }, process.env.JWT_SECRET, {
        expiresIn: "30 days",
      });
      return {
        ...exitingUser.toObject(),
        password: "Not show",
        token: token,
      };
    } else {
      throw new Exception(Exception.WRONG_USERNAME_OR_PASSWORD);
    }
  } else {
    throw new Exception(Exception.WRONG_USERNAME_OR_PASSWORD);
  }
};

const register = async ({ name, email, password, phoneNumber, address }) => {
  print(
    `Register user in user repositories: name: ${name} email: ${email} password: ${password} phoneNumber ${phoneNumber} address ${address}`,
    OutputType.INFORMATION
  );
  // try {
  debugger;
  const exitingUser = await User.findOne({ email }).exec();
  if (!!exitingUser) {
    //check not null
    // console.log(`User exited` + Exception.USER_EXIST);
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
  // console.log(`repository` + newUser);
  return {
    ...newUser._doc,
    password: "Not show",
  };
};
export default {
  login,
  register,
};
