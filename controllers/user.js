import { validationResult } from "express-validator";
import { EventEmitter } from "node:events";
import { studentRepository, userRepository } from "../repositories/index.js";
import HTTPConstStatusCode from "../exceptions/HTTPStatusCode.js";
import Exception from "../exceptions/Exception.js";

const myEvent = new EventEmitter();
myEvent.on("event.register.user", (params) => {
  console.log(`They talked about: ${JSON.stringify(params)}`);
});
const login = async (req, res) => {
  debugger;
  // const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HTTPConstStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  await userRepository.login({ email, password });
  res.status(HTTPConstStatusCode.OK).send("login users Successfully");
};

const register = async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  myEvent.emit(`event.register.user`, { name, email, phoneNumber });
  try {
    debugger;
    const user = await userRepository.register({
      name,
      email,
      password,
      phoneNumber,
      address,
    });
    console.log(user);
    res.status(HTTPConstStatusCode.INSERT_OK).json({
      message: "Register successfully",
      data: user,
    });
  } catch (exceptions) {
    debugger;
    console.log(exceptions);
    res.status(HTTPConstStatusCode.INTERNAL_SERVER_ERROR).JSON({
      message: exceptions.toString(),
    });
  }
};

const getDetailUser = async (req, res) => {
  res.send("GET Detail users");
};

export default {
  login,
  register,
  getDetailUser,
};
