import { query } from "../../database/mysql";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class MysqlUserRepository implements UserRepository {
  async getAll(): Promise<User[] | null> {
    const sql = "SELECT * FROM user";
    try {
      const [data]: any = await query(sql, []);
      const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));

      return dataUsers.map(
        (user: any) =>
          new User(
            user.id,
            user.name,
            user.email
          )
      );
    } catch (error) {
      return null;
    }
  }

  async createUser(
    name: string,
    email: string
  ): Promise<User | null> {
    const sql =
      "INSERT INTO user (name, email) VALUES (?, ?)";
    const params: any[] = [name, email];
    try {
      const [result]: any = await query(sql, params);
      //El objeto Result es un objeto que contiene info generada de la bd
      /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
            estar dentro de un bloque try/catch si hay error se captura en el catch */
      return new User(result.insertId, name, email);
    } catch (error) {
      return null;
    }
  }
}
