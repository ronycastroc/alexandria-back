import joi from "joi";

const signUpSchema = joi.object({
  name: joi.string().min(2).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const signInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const categorySchema = joi.object({
  category: joi
    .string()
    .required()
    .valid("Terror", "Ficção Cientifica", "Romance", "Fantasia", "Auto Ajuda"),
});

async function validateSignUp(req, res, next) {
  const { name, email, password } = req.body;

  const validation = signUpSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const error = validation.error.details.map((value) => value.message);
    return res.status(422).send(error);
  }

  res.locals.user = { name, email, password };
  next();
}

async function validateSignIn(req, res, next) {
  const { email, password } = req.body;

  const validation = signInSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const error = validation.error.details.map((value) => value.message);
    return res.status(422).send(error);
  }

  res.locals.user = { email, password };
  next();
}

async function validateCategory(req, res, next) {
  let CategorySearched = req.params.category;

  CategorySearched.replace("-", " ");

  const schemaValidate = { category: CategorySearched };

  const validation = categorySchema.validate(schemaValidate);

  if (validation.error) {
    const error = validation.error.details.map((value) => value.message);
    return res.status(422).send(error);
  }

  res.locals.category = CategorySearched;
  next();
}

export { validateSignUp, validateSignIn, validateCategory };
