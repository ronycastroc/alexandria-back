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
      author: "Neale Donald Walsch ",
      title: "Conversando com Deus",
      cover:
        "https://m.media-amazon.com/images/P/B095Z6G8K4.01._SCLZZZZZZZ_SX500_.jpg",
      category: "Auto ajuda",
      price: "R$40,00",
    },
    {
      author: "Napoleon Hill",
      title: "Atitude mental positiva",
      cover:
        "https://m.media-amazon.com/images/P/B0153SZGS4.01._SCLZZZZZZZ_SX500_.jpg",
      category: "Auto ajuda",
      price: "R$30,00",
    },
    {
      author: "Shel Silverstein",
      title: "A parte que falta",
      cover:
        "https://images-na.ssl-images-amazon.com/images/I/41D4d0A2GYL._SX412_BO1,204,203,200_.jpg",
      category: "Auto ajuda",
      price: "R$35,00",
    },
    {
      author: "Eckhart Tolle",
      title: "O poder do agora",
      cover:
        "https://m.media-amazon.com/images/P/B00A3D0EF0.01._SCLZZZZZZZ_SX500_.jpg",
      category: "Auto ajuda",
      price: "R$45,00",
    },
    {
      author: "Carol Dweck",
      title: "Mindset",
      cover:
        "https://m.media-amazon.com/images/P/B01NASOQGG.01._SCLZZZZZZZ_SX500_.jpg",
      category: "Auto ajuda",
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
