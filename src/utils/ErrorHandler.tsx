import { message } from "antd";
import { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError): void => {
  switch (error.response?.status) {
    case 400:
      message.error("Bad request. Contact your admin.");
      break;
    case 401:
      message.error("Unauthorized. Log in to access.");
      break;
    case 403:
      message.error("General core error. Contact your admin.");
      break;
    default:
      message.error("General client error. Contact your admin.");
  }
};
