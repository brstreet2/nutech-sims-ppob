import { findAllBanners } from "../repositories/banner.repository";

export const getAllBanners = async () => {
  const banners = await findAllBanners();
  return banners;
};
