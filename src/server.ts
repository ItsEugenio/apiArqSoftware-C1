import express from "express";
import { Signale } from "signale";

import { userRouter } from "./user/infrastructure/UserRouter";
import { productRouter } from "./product/infrastructure/ProductRouter";

const app = express();
app.disable("x-powered-by")

const options = {
  secrets: ["([0-9]{4}-?)+"]
};

const signale = new Signale(options);

app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productRouter);


app.listen(3000, () => {
  signale.success("Server online in port 3000");
}); 
