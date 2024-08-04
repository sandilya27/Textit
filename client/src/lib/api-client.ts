import axios from "axios";

import { config } from "@/utils/config";

export const apiClient = axios.create({
    baseURL: config.host as string,
})