import { AxiosError, AxiosResponse } from "axios";

export const responseInterceptor = (response: AxiosResponse) => response;

export const errorInterceptor = (error: AxiosError) => {
  if (error.response) {
    console.error(
      "Error en la respuesta:",
      error.response.status,
      error.response.data
    );
  } else if (error.request) {
    console.error("Error en la petición (sin respuesta):", error.request);
  } else {
    console.error("Error en la configuración de la petición:", error.message);
  }
  return Promise.reject(error);
};
