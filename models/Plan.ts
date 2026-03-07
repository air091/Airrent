import pool from "@/lib/db";

class Plan {
  static insert = async (
    name: string,
    price: number,
    description: string,
    serviceId: string,
  ) => {
    const insertPlan = `INSERT INTO market.plans (name, price, description)
                        VALUES ($1, $2, $3) RETURNING id`;
    const insertServicePlan = `INSERT INTO market.service_plans (service_id, plan_id)
                              VALUES ($1, $2)`;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const planResult = await client.query(insertPlan, [
        name,
        price,
        description,
      ]);
      const planId = planResult.rows[0].id;
      await client.query(insertServicePlan, [serviceId, planId]);
      await client.query("COMMIT");
      const result = await this.selectPlansInService(serviceId);
      return result[0];
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Insert plan failed");
      throw error;
    } finally {
      client.release();
    }
  };

  static selectPlansInService = async (serviceId: string) => {
    const selectQuery = `SELECT
                            market.plans.id,
                            market.plans.name,
                            market.plans.price,
                            market.plans.description,
                            market.plans.created_at,
                            market.plans.updated_at
                         FROM market.service_plans
                         INNER JOIN market.plans ON market.service_plans.plan_id = market.plans.id
                         WHERE service_id = $1`;
    const client = await pool.connect();
    try {
      const result = await client.query(selectQuery, [serviceId]);
      return result.rows;
    } catch (error) {
      console.error("Select plan in service");
      throw error;
    } finally {
      client.release();
    }
  };

  static updatePlanInService = async (payload: object, planId: string) => {
    const fields = Object.keys(payload)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    const values = Object.values(payload);

    const updateQuery = `UPDATE market.plans
                       SET ${fields}
                       WHERE id = $${values.length + 1}`;

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const result = await client.query(updateQuery, [...values, planId]);

      await client.query("COMMIT");
      return result.rowCount;
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Update plan in service failed");
      throw error;
    } finally {
      client.release();
    }
  };

  static deletePlan = async (planId: string) => {
    const deleteQuery = `DELETE FROM market.plans
                         WHERE id = $1`;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const result = await client.query(deleteQuery, [planId]);
      await client.query("COMMIT");
      return result.rowCount;
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Delete plan failed");
      throw error;
    } finally {
      client.release();
    }
  };
}

export default Plan;
