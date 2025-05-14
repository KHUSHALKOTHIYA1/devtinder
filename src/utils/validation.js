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

module.exports = {
  validateSignUpData,
};
