import { createLogger, format, transports } from "winston";

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.colorize({all: true}),
        format.printf(msg => `[${msg.timestamp}] ${msg.level}: ${msg.message} `
        )
    ),
    transports: [
        new transports.Console()
    ],
});
