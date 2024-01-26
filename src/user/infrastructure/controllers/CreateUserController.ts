import { Request, Response } from "express";

import { CreateUserUseCase } from "../../application/CreateUserUseCase";

export class CreateUserController {
  constructor(readonly createUserUseCase: CreateUserUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const user = await this.createUserUseCase.run(
        data.name,
        data.email,
      );

      if (user)
        res.status(201).send({
          status: "success",
          data: {
            id: user?.id,
            name: user?.name,
            email: user?.email
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "No fue posible agregar el usuario",
        });
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
