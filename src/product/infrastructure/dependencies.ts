import { CreateProductUseCase } from "../application/CreateProductUseCase";
import { GetAllProductUseCase } from "../application/GetAllProductUseCase";
import { CreateProductController } from "./controllers/CreateProductController";
import { GetAllProductController } from "./controllers/GetAllProductController";
import { MysqlProductRepository } from "./MysqlProductRepository";

export const mysqlProductRepository = new MysqlProductRepository();

export const createProductUseCase = new CreateProductUseCase(
  mysqlProductRepository
);
export const getAllUseCase = new GetAllProductUseCase(mysqlProductRepository);
export const createProductController = new CreateProductController(
  createProductUseCase
);
export const getAllProductController = new GetAllProductController(
  getAllUseCase
);

