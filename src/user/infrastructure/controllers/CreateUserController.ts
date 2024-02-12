import { Request, Response } from "express";

import { CreateUserUseCase } from "../../application/CreateUserUseCase";

import { sendUserToQueue  } from "../rabbitmq/UserQueue"

import bcrypt from 'bcrypt';

const saltosBcrypt: number = parseInt(process.env.SALTOS_BCRYPT || '4');

export class CreateUserController {
  constructor(readonly createUserUseCase: CreateUserUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    const hashedPassword: string = await bcrypt.hash(data.password, saltosBcrypt);
    console.log('contraaa',data.password)
    try {
      const user = await this.createUserUseCase.run(
        data.id,
        data.name,
        hashedPassword,
        data.email
      );
      if (user)
        sendUserToQueue(user);
        res.status(201).send({
          status: "success",
          data: {
            id: user?.id,
            name: user?.name,
            password: user?.password,
            email: user?.email
          },
        });
      // else
      //   res.status(204).send({
      //     status: "error",
      //     data: "No fue posible agregar el usuario",
      //   });
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
