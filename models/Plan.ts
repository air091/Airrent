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
}

export default Plan;
