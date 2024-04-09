import HTTPConstStatusCode from "../exceptions/HTTPStatusCode.js";

async function getAllStudents(req, res) {
  res.status(HTTPConstStatusCode.OK).json({
    message: "GET All students",
    data: [
      {
        name: "Nguyen Van A",
        age: 18,
        email: "a@gmail.com",
      },
      {
        name: "Nguyen Van B",
        age: 17,
        email: "b@gmail.com",
      },
      {
        name: "Nguyen Van C",
        age: 19,
        email: "c@gmail.com",
      },
    ],
  });
}

async function getStudentsById(req, res) {
  res.send("GET students by id " + req?.params?.id);
}

async function updateStudent(req, res) {
  res.send("PATCH(create new objects if it not exists) insert students");
}

async function insertStudents(req, res) {
  res.send("POST insert students");
}

export default {
  getStudentsById: getStudentsById,
  getAllStudents: getAllStudents,
  insertStudents,
  updateStudent,
};
