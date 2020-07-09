/**
 * Walks the given directory, and it's subdirectories and find
 * @param directory The directory to check
 * @param extensions The extension to match
 *
 * @param fileList **recursive calls variable*8
 */
export declare function walk(directory: string, extensions?: string[], fileList?: string[]): Promise<string[]>;
/**
 * Get the full path to the app data directory
 *
 * @param append This path is appended to the app data directory
 *
 * @return string The path to the app data directory
 */
export declare function getAppDataDirectory(append?: string): string;
/**
 * Get the full path to the application root directory
 *
 * @param path
 */
export declare function getAppRootDirectory(path: string): Promise<string>;
