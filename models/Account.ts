import pool from "@/lib/db";

class Account {
  static insert = async (
    username: string,
    email: string,
    password: string,
    roleId: string,
    statusId: string,
  ) => {
    const insertUserQuery = `INSERT INTO market.users (username)
                       VALUES ($1) 
                       RETURNING id`;
    const insertAccountQuery = `INSERT INTO auth.accounts (email, password, role_id, status_id, user_id)
                          VALUES ($1, $2, $3, $4, $5) 
                          RETURNING *`;
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const userResults = await client.query(insertUserQuery, [username]);
      const userId = userResults.rows[0].id;
      const accountResults = await client.query(insertAccountQuery, [
        email,
        password,
        roleId,
        statusId,
        userId,
      ]);

      await client.query("COMMIT");
      return accountResults.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Insert User and Account failed");
      throw error;
    } finally {
      client.release();
    }
  };

  static findByEmail = async (email: string) => {
    const selectQuery = `SELECT id, email, password, user_id FROM auth.accounts
                         WHERE email = $1`;
    const client = await pool.connect();
    try {
      const results = await client.query(selectQuery, [email]);
      return results.rows[0];
    } catch (error) {
      console.error("Find account by email failed");
      throw error;
    } finally {
      client.release();
    }
  };
}

export default Account;
