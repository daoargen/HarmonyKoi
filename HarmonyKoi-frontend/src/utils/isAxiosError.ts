import axios, { AxiosError } from "axios";

// Type predicate
export default function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}
