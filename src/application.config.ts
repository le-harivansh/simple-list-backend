import { registerAs } from "@nestjs/config";

const DEFAULT_APPLICATION_PORT = 3000;

export default registerAs('application', () => ({
    port: process.env.APPLICATION_PORT || DEFAULT_APPLICATION_PORT,
}));