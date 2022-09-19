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
  category: joi.string().required(),
});

const purchaseDataSchema = joi.object({
  books: joi.array(),
  name: joi.string().required(),
  phone: joi.string().required(),
  zipCode: joi.string().required(),
  adress: joi.string().required(),
  number: joi.string().required(),
  complement: joi.string(),
  reference: joi.string(),
  district: joi.string().required(),
  city: joi.string().required(),
  state: joi.string().required(),
  country: joi.string().required(),
  payment: joi.string().valid("credit", "debit").required(),
  nameCard: joi.string().required(),
  numberCard: joi.string().required(),
  validity: joi.string().required(),
  codeCard: joi.string().required(),
  parcels: joi.string().required(),
  subTotal: joi.number().required(),
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

  //CategorySearched.replace("-", " ");

  if (CategorySearched === "Auto-ajuda") {
    CategorySearched = "Auto ajuda";
  }

  if (CategorySearched === "Ficção-Cientifica") {
    CategorySearched = "Ficção Cientifica";
  }

  const schemaValidate = { category: CategorySearched };

  const validation = categorySchema.validate(schemaValidate);

  if (validation.error) {
    const error = validation.error.details.map((value) => value.message);
    return res.status(422).send(error);
  }
  console.log(CategorySearched);

  res.locals.category = CategorySearched;
  next();
}

async function validatePurcharse(req, res, next) {
  const {
    name,
    phone,
    zipCode,
    adress,
    number,
    complement,
    reference,
    district,
    city,
    state,
    country,
    payment,
    nameCard,
    numberCard,
    validity,
    codeCard,
    parcels,
    subTotal,
  } = req.body;

  const validation = purchaseDataSchema.validate(req.body, {
    abortEarly: false,
  });

  if (validation.error) {
    const error = validation.error.details.map((value) => value.message);
    return res.status(422).send(error);
  }

  res.locals.purchase = {
    name,
    phone,
    zipCode,
    adress,
    number,
    complement,
    reference,
    district,
    city,
    state,
    country,
    payment,
    nameCard,
    numberCard,
    validity,
    codeCard,
    parcels,
    subTotal,
  };
  next();
}

export { validateSignUp, validateSignIn, validateCategory, validatePurcharse };
