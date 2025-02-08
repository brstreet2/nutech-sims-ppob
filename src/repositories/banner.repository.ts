import pool from "../database/db";

export const findAllBanners = async () => {
  const result = await pool.query(
    "SELECT banner_name, banner_image, description FROM banners ORDER BY id ASC"
  );
  return result.rows;
};
