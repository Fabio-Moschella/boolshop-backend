const { ValidationFacade } = require("@ricciodev/laravel-like-validation");

const popupValidation = {
  body: {
    name: "reuired|min:3|max:30",
    surname: "reuired|min:3|max:30",
    email: ["required", "regex:/[a-z]/"],
  },
};

const popupDataValidation = ValidationFacade.make(popupValidation);
module.exports = popupDataValidation;
