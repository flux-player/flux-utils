/// <reference types="node" />
import { Stats } from "fs";
import { URL } from "url";
/**
 * Asynchronously writes data to a file, replacing the file if it already exists. data can be a string or a buffer.
 *
 * @param fileName  filename or file descriptor
 * @param data Data to write to file
 */
export declare function writeFile(fileName: string | Buffer | URL, data: string | Buffer | Uint8Array): Promise<void>;
/**
 * Ensure that the given path exists
 * @param path
 * @param mask
 */
export declare function ensureFilePathExists(path: string, mask?: number): Promise<void>;
/**
 * Asynchronously reads data from a file
 * If a file descriptor is provided, the underlying file will _not_ be closed automatically.
 *
 * @param fileName  filename or file descriptor
 */
export declare function readFile(fileName: string | Buffer | URL): Promise<Buffer>;
/**
 * Return information about a file, in the buffer
 *
 * @param path
 */
export declare function stat(path: string | Buffer | URL): Promise<Stats> | PromiseLike<Stats>;
/**
 * Reads the contents of a directory.
 *
 * @param path
 */
export declare function readDir(path: string | Buffer | URL): Promise<string[]> | PromiseLike<string[]>;
/**
 * Check if a file has any of the extensions we want to check
 *
 * @param file The filename to check
 * @param extensions The extension to match
 */
export declare function hasAnyExtension(file: string, extensions: string[]): boolean;
