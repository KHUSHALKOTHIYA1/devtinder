const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstname, lastname, emailId, password } = req.body;

  if (!firstname || !lastname) {
    throw new Error("name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("please enter valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new error("please enter strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstname",
    "lastname",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];
  return Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
};
module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
