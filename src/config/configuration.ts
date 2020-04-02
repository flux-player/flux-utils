/**
 * Fetch a configuration value from environment variables
 *
 * @param key
 * @param _default
 */
export function env(key: string, _default = null) {
    return typeof process.env[key] ? process.env[key] : _default;
};