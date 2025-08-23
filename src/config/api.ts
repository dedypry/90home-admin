interface Config {
  api: string;
  gallery: string;
  socket: string;
}

interface IConfigs {
  production: Config;
  local: Config;
}
type EnvKeys = keyof IConfigs;

const currentEnv = (import.meta.env.VITE_NODE_ENV || "local") as EnvKeys;

const configs: IConfigs = {
  local: {
    api: "http://127.0.0.1:3333",
    socket: "http://127.0.0.1:3334",
    gallery: "http://127.0.0.1:9876",
  },
  production: {
    api: "https://api.90home.id",
    socket: "https://socket.90home.id",
    gallery: "https://gallery.dpn-pppi.org",
  },
};

const config: Config = configs[currentEnv];

export default config;
