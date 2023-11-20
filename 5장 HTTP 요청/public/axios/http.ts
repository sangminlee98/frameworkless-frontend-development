import { CustomConfig, CustomResponse } from "./type";
import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

const request = async <T, P>(
  params: CustomConfig<P>
): Promise<CustomResponse<T>> => {
  const { url, headers, method, body } = params;
  const config: AxiosRequestConfig = {
    url,
    method,
    headers,
    data: body,
  };
  return axios(config);
};

const get = async <T>(url: string, headers?: RawAxiosRequestHeaders) => {
  const response = await request<T, never>({
    url,
    headers,
    method: "GET",
  });

  return response.data;
};

const post = async <T, P>(
  url: string,
  body: P,
  headers: RawAxiosRequestHeaders
) => {
  const response = await request<T, P>({
    url,
    headers,
    method: "POST",
    body,
  });
  return response.data;
};

const put = async <T, P>(
  url: string,
  body: P,
  headers: RawAxiosRequestHeaders
) => {
  const response = await request<T, P>({
    url,
    headers,
    method: "PUT",
    body,
  });
  return response.data;
};

const patch = async <T, P>(
  url: string,
  body: P,
  headers: RawAxiosRequestHeaders
) => {
  const response = await request<T, P>({
    url,
    headers,
    method: "PATCH",
    body,
  });
  return response.data;
};

const deleteRequest = async <T>(
  url: string,
  headers?: RawAxiosRequestHeaders
) => {
  const response = await request<T, never>({
    url,
    headers,
    method: "DELETE",
  });
  return response.data;
};

export default {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
};
