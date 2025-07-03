const { ValidationFacade } = require("@ricciodev/laravel-like-validation");

const checkoutValidation = {
  body: {
    name: "reuired|min:3|max:30",
    surname: "reuired|min:3|max:30",
    address: "required|min:3|max:50",
    phone: "required|min:3|max:12|",
    email: ["required", "regex:/[a-z]/"],
  },
};

const checkoutDataValidation = ValidationFacade.make(checkoutValidation);
module.exports = checkoutDataValidation;
