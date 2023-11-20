import { XhrConfig, XhrResponse } from "./type";

const setHeaders = (xhr: XMLHttpRequest, headers: HeadersInit) => {
  Object.entries(headers).forEach((entry) => {
    const [name, value] = entry;

    xhr.setRequestHeader(name, value);
  });
};

const parseResponse = <T>(xhr: XMLHttpRequest): XhrResponse<T> => {
  const { status, responseText } = xhr;

  let data;
  if (status !== 204) {
    data = JSON.parse(responseText);
  }

  return {
    status,
    data,
  };
};

const request = <T, P>(params: XhrConfig<P>): Promise<XhrResponse<T>> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const { method = "GET", url, headers = {}, body } = params;

    xhr.open(method, url);

    setHeaders(xhr, headers);

    xhr.send(JSON.stringify(body));

    xhr.onerror = () => {
      reject(new Error("HTTP Error"));
    };

    xhr.ontimeout = () => {
      reject(new Error("Timeout Error"));
    };

    xhr.onload = () => resolve(parseResponse(xhr));
  });
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
