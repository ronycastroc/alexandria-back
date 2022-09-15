import { MongoClient } from "mongodb";
import { MONGO_URI } from "../configs/constants.js";

const mongoClient = new MongoClient(MONGO_URI);

async function mongo() {
  let db;

  try {
    await mongoClient.connect();
    db = mongoClient.db("alexandria");
    console.log("MongoDB Conected");
    return db;
  } catch (error) {
    console.log(error.message);
    return error;
  }
}

export default mongo;

// const booksDB = [{
//   author: "J.R.R. Tolkien",
//   title: "O Senhor dos Aneis",
//   cover: "https://images-na.ssl-images-amazon.com/images/I/81SWBRKfExL.jpg",
//   category: "Fantasia",
//   price: "R$40,00"
// }, {
//   author: "J.R.R. Tolkien",
//   title: "O Hobbit",
//   cover: "https://images-na.ssl-images-amazon.com/images/I/511+-lOOtsL._SY344_BO1,204,203,200_.jpg",
//   category: "Fantasia",
//   price: "R$30,00"
// }, {
//   author: "George R.R. Martin",
//   title: "A Guerra dos Tronos",
//   cover: "https://images-na.ssl-images-amazon.com/images/I/41UKpOWrZVL._SY344_BO1,204,203,200_QL70_ML2_.jpg",
//   category: "Fantasia",
//   price: "R$35,00"
// } , {
//   author: "Frank Herbert",
//   title: "Duna",
//   cover: "https://images-na.ssl-images-amazon.com/images/I/41MRn6hy8-L._SY344_BO1,204,203,200_QL70_ML2_.jpg",
//   category: "Fantasia",
//   price: "R$45,00"
// }, {
//   author: "JRR Tolkien",
//   title: "Miguel Cervantes",
//   cover: "https://images-na.ssl-images-amazon.com/images/I/51itDflUblL._SY344_BO1,204,203,200_QL70_ML2_.jpg",
//   category: "Fantasia",
//   price: "R$25,00"
// }]
