import express from "express";

import { getAllUserController,createUserController,getByIdUserController } from "./dependencies";

export const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  getAllUserController.run(req, res)
    .then(() => {
     return null;
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    });
});
userRouter.post("/", (req, res) => {
  createUserController.run(req, res)
    .then(() => {
     return null;
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    });
});
userRouter.get("/:id", (req, res) => {
  getByIdUserController.run(req, res)
    .then(() => {
     return null;
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    });
});

