import mongo from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

let db = await mongo();

const signUp = async (req, res) => {
  const user = res.locals.user;

  const passwordHash = bcrypt.hashSync(user.password, 10);

  try {
    const listUsers = await db.collection("users").find().toArray();

    const userExist = listUsers.find(
      (value) => value.name === user.name || value.email === user.email
    );

    if (userExist) {
      return res.status(409).send("Nome ou E-mail já existente.");
    }

    await db.collection("users").insertOne({
      name: user.name,
      email: user.email,
      password: passwordHash,
    });

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const signIn = async (req, res) => {
  const { email, password } = res.locals.user;

  const user = await db.collection("users").findOne({
    email,
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = uuid();

    await db.collection("sessions").insertOne({
      userId: user._id,
      timestamp: Date.now(),
      token,
    });

    delete user.password;

    res.send({
      ...user,
      token,
    });

    setInterval(async () => {
      const minute = 60 * 1000;
      const time = Date.now();

      const users = await db.collection("sessions").find().toArray();

      const usersInactive = users.filter(
        (value) => time - value.timestamp > minute * 60
      );

      await db.collection("sessions").deleteMany(usersInactive.userId);
    }, 1800000);
  } else {
    res.sendStatus(401);
  }
};

export { signUp, signIn };
