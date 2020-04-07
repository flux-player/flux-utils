/**
 * Types of log entry types
 */
export type LogType = "info" | "error";

/**
 * Add an entry to the application log
 * @param data
 */
export function log(type: LogType, ...data: any[]) {
  console[type](...data);
  // TODO: Implement method
}
