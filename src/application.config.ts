import { registerAs } from "@nestjs/config";

const DEFAULT_APPLICATION_PORT = 3000;

export default registerAs('application', () => ({
    port: process.env.PORT || DEFAULT_APPLICATION_PORT,
}));