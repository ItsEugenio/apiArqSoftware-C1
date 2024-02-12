import express from "express";

import { getAllProductController,createProductController } from "./dependencies";

export const productRouter = express.Router();

productRouter.get("/", (req, res) => {
  getAllProductController.run(req, res)
    .then(() => {
     return null;
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});
productRouter.post("/", (req, res) => {
  createProductController.run(req, res)
    .then(() => {
     return null;
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});