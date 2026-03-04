import pool from "@/lib/db";

class Service {
  static insert = async (
    title: string,
    imageUrl: string,
    description: string,
    statusId: string,
    hostId: string,
  ) => {
    const insertServiceQuery = `INSERT INTO market.services (title, image_url, description, status_id)
                                VALUES ($1, $2, $3 ,$4)
                                RETURNING id`;
    const insertUserServiceQuery = `INSERT INTO market.user_services (service_id, user_id)
                                    VALUES ($1, $2)`;
    const selectQuery = `SELECT
                            market.services.id,
                            market.users.username as host,
                            market.services.title,
                            market.services.image_url as image,
                            market.services.description,
                            market.service_statuses.name AS status,
                            market.services.created_at,
                            market.services.updated_at
                         FROM market.user_services
                         INNER JOIN
                            market.services ON market.user_services.service_id = market.services.id
                         INNER JOIN
                            market.users ON market.user_services.user_id = market.users.id
                         INNER JOIN
                            market.service_statuses ON market.services.status_id = market.service_statuses.id
                         WHERE market.user_services.service_id = $1 AND market.user_services.user_id = $2`;

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const insertServiceResults = await client.query(insertServiceQuery, [
        title,
        imageUrl,
        description,
        statusId,
      ]);
      const serviceId = insertServiceResults.rows[0].id;
      await client.query(insertUserServiceQuery, [serviceId, hostId]);
      await client.query("COMMIT");
      const result = await client.query(selectQuery, [serviceId, hostId]);
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Service insert failed");
      throw error;
    } finally {
      client.release();
    }
  };

  static selectAllByHost = async (hostId: string) => {
    const selectQuery = `SELECT 
                            market.services.id,
                            market.users.username AS host,
                            market.services.title,
                            market.services.image_url AS image,
                            market.services.description,
                            market.service_statuses.name AS status,
                            market.services.created_at,
                            market.services.updated_at
                         FROM market.user_services
                         INNER JOIN
                            market.services ON market.user_services.service_id = market.services.id
                         INNER JOIN 
                            market.users ON market.user_services.user_id = market.users.id
                         INNER JOIN
                            market.service_statuses ON market.services.status_id = market.service_statuses.id
                         WHERE market.user_services.user_id = $1`;
    const client = await pool.connect();
    try {
      const results = await client.query(selectQuery, [hostId]);
      return results.rows;
    } catch (error) {
      console.error("Service select all failed");
      throw error;
    } finally {
      client.release();
    }
  };
}

export default Service;
