const minLength = 5;
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email) => regex.test(email);

const validatePassword = (password) => password.length >= minLength;

const handleValidation = (email, password) => {
  console.log(validateEmail(email), validatePassword(password));
  return validateEmail(email) && validatePassword(password);
};

export default handleValidation;
