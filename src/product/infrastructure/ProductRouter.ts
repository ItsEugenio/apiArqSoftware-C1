import express from "express";

import { createProductController } from "./dependencies";
import { getAllProductController } from "./dependencies";

export const productRouter = express.Router();

productRouter.get(
  "/",
  getAllProductController.run.bind(getAllProductController)
);
productRouter.post(
  "/",
  createProductController.run.bind(createProductController)
);
