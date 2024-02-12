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
            user.password,
            user.email
          )
      );
    } catch (error) {
      return null;
    }
  }

  async createUser(
    id: number,
    name: string,
    password: string,
    email: string
  ): Promise<User | null> {
    const sql =
      "INSERT INTO user (id, name, password, email) VALUES (?, ?, ?, ?)";
    const params: any[] = [id, name, password, email];
    try {
      const [result]: any = await query(sql, params);
      if (result.affectedRows === 1) {
        return new User(id, name, password, email);
      } else {
        return null; // No se pudo insertar correctamente
      }
    } catch (error) {
      return null; // Ocurrió un error durante la inserción
    }
  }

  async getById(id: number): Promise<User[] | null> {
      const sql = "SELECT * FROM user where id=?";
      const params: any[] = [id];
      try {
        const [data]: any = await query(sql,params);
        const dataUsers = Object.values(JSON.parse(JSON.stringify(data)))
        return dataUsers.map(
          (user: any) =>
          new User(
            user.id,
            user.name,
            user.password,
            user.email
          )
        );
      } catch (error) {
        return null;
      }
  }
}
