import { findAllServices } from "../repositories/service.repository";

export const getAllServices = async () => {
  const services = await findAllServices();
  return services;
};
