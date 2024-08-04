const { VITE_SERVER_URL } = import.meta.env;

const _config = {
    host: VITE_SERVER_URL,
    authRoute: "/api/users",
}

export const config = Object.freeze(_config);