import Exception from "../exceptions/Exception.js";
import { print } from "../helpers/prints.js";
import { Student } from "../models/index.js";
import { faker } from "@faker-js/faker";

const getAllStudents = async ({ page, size, searchString }) => {
  console.log(
    "Get all students in user repositories " +
      page +
      " " +
      size +
      " " +
      searchString
  );
  //aggregate data for all students

  page = parseInt(page);
  size = parseInt(size);
  let filteredStudent = await Student.aggregate([
    {
      $match: {
        $or: [
          {
            name: { $regex: `.*${searchString}.*`, $options: "i" },
          },
          {
            email: { $regex: `.*${searchString}.*`, $options: "i" },
          },
          {
            address: { $regex: `.*${searchString}.*`, $options: "i" },
          },
        ],
      },
    },
    { $skip: (page - 1) * size },
    { $limit: size },
  ]);
  return filteredStudent;
};

const getDetailStudent = async (studentId) => {
  const student = await Student.findById(studentId);
  if (!student) {
    throw new Exception("Cannot find student with id :" + studentId);
  }
  return student;
};

const insertStudent = async ({
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  console.log(
    `Insert user in students repositories:` + languages + " " + address
  );
  try {
    const student = await Student.create({
      name,
      email,
      languages,
      gender,
      phoneNumber,
      address,
    });
    console.log(student);
  } catch (exceptions) {
    console.log(`insert exception ` + exceptions);
    if (!!exceptions.errors) {
      throw new Exception("Input errors ", exceptions.errors);
    }
  }
};

const updateStudent = async ({
  id,
  name,
  email,
  languages,
  gender,
  phoneNumber,
  address,
}) => {
  console.log(
    `update student in students repositories:` + name + " " + address + " " + id
  );
  try {
    const student = await Student.findById(id);
    console.log(student);
    student.name = name ?? student.name;
    student.email = email ?? student.email;
    student.languages = languages ?? student.languages;
    student.gender = gender ?? student.gender;
    student.phoneNumber = phoneNumber ?? student.phoneNumber;
    student.address = address ?? student.address;
    await student.save();
    console.log(student);
    return student;
  } catch (exceptions) {
    console.log(`update exception ` + exceptions);
    if (!!exceptions.errors) {
      throw new Exception("Input errors ", exceptions.errors);
    }
  }
};

async function generateFakeStudent() {
  [...Array(20).keys()].forEach(async (index) => {
    let fakeStudents = {
      name: `${faker.person.fullName()}-faker`,
      email: faker.internet.email(),
      languages: [
        faker.helpers.arrayElement(["English", "Vietnamese", "French"]),
        faker.helpers.arrayElement(["Korean", "Japanese", "Chinese"]),
      ],
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      phoneNumber: faker.phone.number(),
      address: faker.location.streetAddress(),
    };
    await Student.create(fakeStudents);
    print(`Inserted student with name ${fakeStudents.name}`);
  });
}

export default {
  getAllStudents,
  insertStudent,
  generateFakeStudent,
  getDetailStudent,
  updateStudent,
};
