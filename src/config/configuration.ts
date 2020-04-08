/**
 * Fetch a configuration value from environment variables
 *
 * @param key
 * @param _default
 */
export function env(key: string, _default: any = null) : any {
  return process.env[key] ?? _default;
}
