import pool from "../database/db";

export const findAllServices = async () => {
  const result = await pool.query(
    "SELECT service_code, service_name, service_icon, service_tariff FROM services ORDER BY id ASC"
  );
  return result.rows;
};

export const findServiceByCode = async (code: string) => {
  const result = await pool.query(
    "SELECT * FROM services WHERE service_code = $1",
    [code]
  );

  return result.rows[0];
};
