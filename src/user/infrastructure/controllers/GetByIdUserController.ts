import { Request, Response } from "express";

import { GetByIdUserUseCase } from "../../application/GetByIdUserUseCase";

export class GetByIdUserController {
    constructor(readonly getByIdUserUseCase: GetByIdUserUseCase) {}

    async run(req: Request, res:Response) {
        const id : number = parseInt(req.params.id)

        try {
            const user = await this.getByIdUserUseCase.run(id);
            if(user)
            res.status(200).send({
                status: "success",
                data: user.map((user: any) => {
                  return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
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