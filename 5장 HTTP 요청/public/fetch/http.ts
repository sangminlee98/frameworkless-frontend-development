import { FetchConfig, FetchResponse } from "./type";

const parseResponse = async <T>(
  response: Response
): Promise<FetchResponse<T>> => {
  const { status } = response;
  let data;
  if (status !== 204) {
    data = await response.json();
  }

  return {
    status,
    data,
  };
};

const request = async <T, P>(
  params: FetchConfig<P>
): Promise<FetchResponse<T>> => {
  const { method = "GET", url, headers = {}, body } = params;

  const config: RequestInit = {
    method,
    headers: new window.Headers(headers),
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await window.fetch(url, config);

  return parseResponse(response);
};

const get = async <T>(url: string, headers?: HeadersInit) => {
  const response = await request<T, never>({
    url,
    headers,
    method: "GET",
  });

  return response.data;
};

const post = async <T, P>(url: string, body: P, headers: HeadersInit) => {
  const response = await request<T, P>({
    url,
    headers,
    method: "POST",
    body,
  });
  return response.data;
};

const put = async <T, P>(url: string, body: P, headers: HeadersInit) => {
  const response = await request<T, P>({
    url,
    headers,
    method: "PUT",
    body,
  });
  return response.data;
};

const patch = async <T, P>(url: string, body: P, headers: HeadersInit) => {
  const response = await request<T, P>({
    url,
    headers,
    method: "PATCH",
    body,
  });
  return response.data;
};

const deleteRequest = async <T>(url: string, headers?: HeadersInit) => {
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
