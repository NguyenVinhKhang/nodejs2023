import { MAX_RECORDS } from "../Global/constant.js";
import HTTPConstStatusCode from "../exceptions/HTTPStatusCode.js";
import { studentRepository } from "../repositories/index.js";

async function getAllStudents(req, res) {
  let { page = 1, size = MAX_RECORDS, searchString = "" } = req.query;
  size = size >= MAX_RECORDS ? MAX_RECORDS : size;
  console.log(
    `Student req.query: ` +
      req.query.page +
      " " +
      req.query.size +
      " " +
      req.query.searchString
  );
  try {
    let filteredStudent = await studentRepository.getAllStudents({
      size,
      page,
      searchString,
    });

    res.status(HTTPConstStatusCode.OK).json({
      message: "GET All students",
      size: filteredStudent.length,
      page: page,
      searchString: searchString,
      data: filteredStudent,
    });
  } catch (exception) {
    res.status(HTTPConstStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Cannot load student",
    });
  }
}

async function getStudentsById(req, res) {
  try {
    let studentId = req?.params?.id;
    const student = await studentRepository.getDetailStudent(studentId);
    // res.send("GET students by id " + req?.params?.id);
    res.status(HTTPConstStatusCode.OK).json({
      message: "GET detail student",
      data: student,
    });
  } catch (exception) {
    res.status(HTTPConstStatusCode.BAD_REQUEST).json({
      message: "Cannot find students:" + exception,
    });
  }
}

async function updateStudent(req, res) {
  // res.send("PATCH(create new objects if it not exists) insert students");
  const { id, name, email, languages, gender, phoneNumber, address } = req.body;
  try {
    console.log(`Student req.body: ` + req.body);
    const student = await studentRepository.updateStudent(req.body);
    res.status(HTTPConstStatusCode.INSERT_OK).json({
      message: "update students successfully",
      data: student,
    });
  } catch (exception) {
    res.status(HTTPConstStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Cannot update students:",
      validationError: exception.validationErrors,
    });
  }
}

async function insertStudents(req, res) {
  // res.send("POST insert students");
  try {
    console.log(`Student req.body: ` + req.body);
    const student = await studentRepository.insertStudent(req.body);
    res.status(HTTPConstStatusCode.INSERT_OK).json({
      message: "Insert students successfully",
      data: student,
    });
  } catch (exception) {
    res.status(HTTPConstStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Cannot insert students:",
      validationError: exception.validationErrors,
    });
  }
}

async function generateFakeStudent(req, res) {
  await studentRepository.generateFakeStudent(req.body);
  res.status(HTTPConstStatusCode.INSERT_OK).json({
    message: "Insert students successfully",
  });
}
export default {
  getStudentsById,
  getAllStudents,
  insertStudents,
  updateStudent,
  generateFakeStudent,
};
