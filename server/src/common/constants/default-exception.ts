import { StatusCode } from './status-code';

export const DefaultException = {
    ID: 0,
    STATUS: StatusCode.INTERNAL_SERVER_ERROR,
    MESSAGE: 'Internal server error'
} as const;