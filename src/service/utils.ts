import axios from "axios";
import { AxiosInstance } from "axios";
import { IncomingHttpHeaders } from "http";

export const withHeaders = <Response, Request>(
  handler: (axios: AxiosInstance, data: Request | undefined) => Response
) => {
  return ({
    data,
    headers,
  }: {
    headers?: IncomingHttpHeaders;
    data?: Request;
  } = {}) => {
    return handler(
      axios.create({
        headers: { Cookie: headers?.cookie },
      }),
      data
    );
  };
};
