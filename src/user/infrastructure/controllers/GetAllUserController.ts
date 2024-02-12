import { Request, Response } from "express";

import { GetAllUserUseCase } from "../../application/GetAllUsersUseCase";

export class GetAllUserController {
  constructor(readonly getAllUserUseCase: GetAllUserUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const users = await this.getAllUserUseCase.run();
      console.log(users);
      if (users)
        res.status(200).send({
          status: "success",
          data: users.map((user: any) => {
            return {
              id: user.id,
              name: user.name,
              email: user.email
            };
          }),
        });
      else
        res.status(400).send({
          status: "error",
          msn: "Ocurrio algún problema",
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
