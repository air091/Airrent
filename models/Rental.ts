import pool from "@/lib/db";

class Rental {
  static insert = async (
    serviceId: string,
    tenantId: string,
    rentStart: Date,
    paymentStatusId: string,
  ) => {
    const insertQuery = `INSERT INTO market.rentals (service_id, tenant_id, rent_start, payment_status_id)
                         VALUES ($1, $2, $3, $4)`;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(insertQuery, [
        serviceId,
        tenantId,
        rentStart,
        paymentStatusId,
      ]);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Insert rental failed");
      throw error;
    } finally {
      client.release();
    }
  };
}
