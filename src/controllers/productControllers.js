import mongo from "../database/db.js";
import { ObjectId } from "mongodb";

const db = await mongo();

const GetProducts = async (req, res) => {
  try {
    const listOfProducts = await db.collection("products").find().toArray();
    res.status(200).send(listOfProducts);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const GetProductWithID = async (req, res) => {
  const id = req.params.bookId;

  if (!id) {
    return res
      .status(400)
      .send("É necessário o envio de Id para fazer a consulta");
  }

  try {
    const book = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    if (!book) {
      return res.status(404).send("Produto não encontrado");
    }

    res.status(200).send(book);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const GetProductsWithCategory = async (req, res) => {
  const categorySearched = res.locals.category;
  try {
    const listOfProducts = await db
      .collection("products")
      .find({ category: categorySearched })
      .toArray();
    res.status(200).send(listOfProducts);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const FeedDB = async (req, res) => {
  const booksDB = [
    {
      author: "Isaac Azimov",
      title: "Eu, Robô",
      cover:
        "https://m.media-amazon.com/images/P/B015EED2O2.01._SCLZZZZZZZ_SX500_.jpg",
      category: "Ficção Cientifica",
      price: "R$40,00",
    },
    {
      author: "Isaac Azimov",
      title: "As Cavernas de Aço",
      cover:
        "https://m.media-amazon.com/images/P/B015EEAHB8.01._SCLZZZZZZZ_SX500_.jpg",
      category: "Ficção Cientifica",
      price: "R$30,00",
    },
    {
      author: "Isaac Azimov",
      title: "Fundação",
      cover:
        "https://m.media-amazon.com/images/P/B015EECZDQ.01._SCLZZZZZZZ_SX500_.jpg",
      category: "Ficção Cientifica",
      price: "R$35,00",
    },
    {
      author: "Isaac Azimov",
      title: "O despertar",
      cover:
        "https://m.media-amazon.com/images/P/B0B5JTDNT4.01._SCLZZZZZZZ_SX500_.jpg",
      category: "Ficção Cientifica",
      price: "R$45,00",
    },
    {
      author: "Isaac Azimov",
      title: "O vilarejo",
      cover:
        "https://m.media-amazon.com/images/P/B014IHZ5X2.01._SCLZZZZZZZ_SX500_.jpg",
      category: "Ficção Cientifica",
      price: "R$25,00",
    },
  ];

  try {
    booksDB.forEach(
      async (book) => await db.collection("products").insertOne(book)
    );
    res.sendStatus(201);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500);
  }
};

export { GetProducts, FeedDB, GetProductWithID, GetProductsWithCategory };
