// Mongoose
// =========================================
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
// const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Express config
//  ==============================================
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Sécuritas
app.use(helmet());
// Allow... EVERYTGHING!!!!
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content', 'Accept', 'Content-Type', 'Authorization']
}));

// Routes
// ==================================

import Book from "./models/bookModel.js";
import User from "./models/userModel.js";

app.get("/api/books", (req, res) => {
  try {
    Book.find()
      .then(
        (books) => {
          res.status(200).json(books);
        }
      ).catch(
        (error) => {
          res.status(500).json({ error });
        }
      );
  } catch (err) {
    return res.status(500).json({ error: "Hmmm, server problem on get api/books" });
  }
});

app.get("/api/books/:id", (req, res) => {
  try {
    Book.findOne({ _id: req.params.id })
      .then(
        (book) => {
          // console.log("Here is your book sir");
          res.status(200).json(book);
        }
      ).catch(
        (error) => {
          console.log(error);
          res.status(404).json("can not find this book with the id : " + req.params.id);
        }
      );
  } catch (error) {
    console.log("Hmmm, server problem on get api/book/:id");
    return res.status(500).json(error);
  }
});

app.delete("/api/books/:id", (req, res) => {
  try {
    Book.findOne({ _id: req.params.id })
      .then(
        (book) => {
          res.status(200).json(book);
        }
      ).catch(
        (error) => {
          console.log(error);
          res.status(404).json("can not find this book with the id : " + req.params.id);
        }
      );
  } catch (error) {
    console.log("Hmmm, server problem on get api/book/:id");
    return res.status(500).json(error);
  }
});

app.put("/api/books/:id", (req, res) => {
  try {
    Book.findOne({ _id: req.params.id })
      .then(
        (book) => {
          res.status(200).json(book);
        }
      ).catch(
        (error) => {
          console.log(error);
          res.status(404).json("can not find this book with the id : " + req.params.id);
        }
      );
  } catch (error) {
    return res.status(500);
  }
});


// Cloudinary 
// ========================================
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: "uploads/" });
// Est ce obligé?

// Upload book
// Ajouter un middleware pour gérer l'envoi à cloudinary, le formatage du nom ect, puis envoyer a uploadBook avec l'adresse de l'image
app.post("/api/books/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: req.file.originalname.split(".")[0] + "_" + Date.now(),
    });
    console.log(req.file.originalname, req.file.originalname.split(".")[0] + "_" + Date.now())
    await fs.unlink(req.file.path); // Supprime le fichier temporaire si tout a bien...

    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Erreur d'upload :", error);
    res.status(500).json({ error: "Upload échoué" });
  }
});

export default app;
