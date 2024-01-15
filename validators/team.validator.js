const joi = require("joi");

/* SIGN UP SCHEMA */
const signUpSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Team Name is required",
  }),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{7,30}$"))
    .required()
    .messages({
      "string.min": "Password must be at least 7 characters long",
      "string.max": "Password must be at most 30 characters long",
      "string.pattern.base":
        "Password must contain only alphanumeric characters",
    }),
  confirmPassword: joi.ref("password"),
  sherlockId: joi.string().required().messages({
    "string.empty": "Sherlock Id is required",
  }),
  watsonId: joi.string().required().messages({
    "string.empty": "Watson Id is required",
  }),
});

/* SIGN IN SCHEMA */
const signInSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Team Name is required",
  }),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{7,30}$"))
    .required()
    .messages({
      "string.min": "Password must be at least 7 characters long",
      "string.max": "Password must be at most 30 characters long",
      "string.pattern.base":
        "Password must contain only alphanumeric characters",
    }),
  kid: joi.string().required().messages({
    "string.empty": "Kid Id is required",
  }),
  character: joi.string().valid("sherlock", "watson").required(),
});

/* SIGN UP VALIDATOR */
const signUpValidator = (req, res, next) => {
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    console.error(error);
    res.status(422).json({
      message: error.details[0].message,
    });
    return;
  }
  next();
};

/* SIGN IN VALIDATOR */
const signInValidator = (req, res, next) => {
  const { error } = signInSchema.validate(req.body);
  if (error) {
    console.error(error);
    res.status(422).json({
      message: error.details[0].message,
    });
    return;
  }
  next();
};

module.exports = { signUpValidator, signInValidator };
