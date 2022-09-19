import mongo from "../database/db.js";
import dayjs from "dayjs";

let date = dayjs().locale("pt-br").format("DD/MM/YYYY, HH:mm:ss");

let db = await mongo();

const createPurchase = async (req, res) => {
  const purchase = req.locals.purchase;
  const session = res.locals.session;
  try {
    await db.collection("purchases").insertOne({
      purchase,
      date,
      userId: session.userId,
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { createPurchase };
