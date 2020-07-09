/**
 * Types of log entry types
 */
export declare type LogType = "info" | "error";
/**
 * Add an entry to the application log
 * @param data
 */
export declare function log(type: LogType, ...data: any[]): void;
