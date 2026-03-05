import pool from "@/lib/db";

class Account {
  static insert = async (
    username: string,
    email: string,
    password: string,
    roleId: string,
    statusId: string,
  ) => {
    const insertQuery = `INSERT INTO auth.accounts (username, email, password, role_id, status_id)`;
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const userResults = await client.query(insertQuery, [
        username,
        email,
        password,
        roleId,
        statusId,
      ]);
      const userId = userResults.rows[0].id;

      await client.query("COMMIT");
      const result = await this.findById(userId);
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Insert User and Account failed");
      throw error;
    } finally {
      client.release();
    }
  };

  static findById = async (userId: string) => {
    const selectQuery = `SELECT 
                            auth.account.id,
                            auth.account.username,
                            auth.account.email,
                            auth.account.image_url AS image,
                            auth.roles.name AS role,
                            auth.statuses.name AS status,
                            auth.account.created_at,
                            auth.account.updated_at
                          FROM auth.accounts
                          INNER JOIN 
                            auth.roles ON auth.accounts.role_id = auth.roles.id
                          INNER JOIN 
                            auth.statuses ON auth.accounts.status_id = auth.statuses.id
                          WHERE auth.accounts.id = $1`;
    const client = await pool.connect();

    try {
      const results = await client.query(selectQuery, [userId]);
      return results.rows[0];
    } catch (error) {
      console.error("Find account by id failed");
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
