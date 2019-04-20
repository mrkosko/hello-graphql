
const messagesDictionary = {
  "EmailIsNotSpecified": "Email is not specified",
  "EmailLacksAtCharacter": "Email is invalid",
  "PasswordIsTooShort": "Password should have 8 characters minimum",
  "PasswordLacksUpperCaseCharacter": "Password should have at least 1 uppercase character",
  "PasswordLacksLowerCaseCharacter": "Password should have at least 1 lowercase character",
  "PasswordLacksDigitCharacter": "Password should have at least 1 digit character",
  "PasswordLacksSpecialCharacter": "Password should have at least 1 special character",
  "OperationCompletedSuccessfully": "Operation completed successfully"
}

export const resolveMessage = ({ message }) => {
  return messagesDictionary[message] || "An error occured"
}