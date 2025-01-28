import { APIURLCONTROLSOCKET } from "@/component/@variables/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
});

export const apiSocket = axios.create({
  baseURL: APIURLCONTROLSOCKET,
});
