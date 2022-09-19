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
      author: "Stephen King",
      title: "Outsider",
      cover:
        "https://m.media-amazon.com/images/P/B07D3XR7ZH.01._SCLZZZZZZZ_SX500_.jpg",
      category: "Terror",
      price: "R$40,00",
    },
    {
      author: "William Blatty",
      title: "O Exorcista",
      cover:
        "https://m.media-amazon.com/images/P/B00F54PVGO.01._SCLZZZZZZZ_SX500_.jpg",
      category: "Terror",
      price: "R$30,00",
    },
    {
      author: "Bram Stoker",
      title: "Drácula",
      cover:
        "https://images-na.ssl-images-amazon.com/images/I/51kYAhF49CL._SX352_BO1,204,203,200_.jpg",
      category: "Terror",
      price: "R$35,00",
    },
    {
      author: "Stephen King",
      title: "O cemitério",
      cover:
        "https://m.media-amazon.com/images/P/B00CEZUV26.01._SCLZZZZZZZ_SX500_.jpg",
      category: "Terror",
      price: "R$45,00",
    },
    {
      author: "Stephen King",
      title: "Misery",
      cover:
        "https://m.media-amazon.com/images/P/B00JG9BCJO.01._SCLZZZZZZZ_SX500_.jpg",
      category: "Terror",
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
