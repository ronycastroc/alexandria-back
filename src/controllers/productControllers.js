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
      return res.status(404).send("");
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
      author: "J.R.R. Tolkien",
      title: "O Senhor dos Aneis",
      cover: "https://images-na.ssl-images-amazon.com/images/I/81SWBRKfExL.jpg",
      category: "Fantasia",
      price: "R$40,00",
    },
    {
      author: "J.R.R. Tolkien",
      title: "O Hobbit",
      cover:
        "https://images-na.ssl-images-amazon.com/images/I/511+-lOOtsL._SY344_BO1,204,203,200_.jpg",
      category: "Fantasia",
      price: "R$30,00",
    },
    {
      author: "George R.R. Martin",
      title: "A Guerra dos Tronos",
      cover:
        "https://images-na.ssl-images-amazon.com/images/I/41UKpOWrZVL._SY344_BO1,204,203,200_QL70_ML2_.jpg",
      category: "Fantasia",
      price: "R$35,00",
    },
    {
      author: "Frank Herbert",
      title: "Duna",
      cover:
        "https://images-na.ssl-images-amazon.com/images/I/41MRn6hy8-L._SY344_BO1,204,203,200_QL70_ML2_.jpg",
      category: "Fantasia",
      price: "R$45,00",
    },
    {
      author: "Miguel Cervantes",
      title: "Dom Quixote",
      cover:
        "https://images-na.ssl-images-amazon.com/images/I/51itDflUblL._SY344_BO1,204,203,200_QL70_ML2_.jpg",
      category: "Fantasia",
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
