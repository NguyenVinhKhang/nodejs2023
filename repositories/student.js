const getAllStudents = async ({ page, size, searchString }) => {
  console.log("Get all students in user repositories");
};

const insertStudent = async ({
  name,
  email,
  language,
  gender,
  phoneNumber,
  address,
}) => {
  // console.log(
  //   `Insert user in students repositories: name: ${name} email: ${email} language: ${language} gender: ${gender}phoneNumber ${phoneNumber} address ${address}`
  // );
  console.log(`Insert user in students repositories:`);
};
export default {
  getAllStudents,
  insertStudent,
};
