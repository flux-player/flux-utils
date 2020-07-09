/// <reference types="node" />
/**
 * Generate a random string with the specified length
 *
 * @param length
 */
export declare function randomString(length: number): string;
/**
 * Convert a node buffer to a string
 *
 * @param buffer
 * @param encoding
 */
export declare function bufferToString(buffer: Buffer, encoding?: string): string;
/**
 * Removes path-illegal characters from a filename
 *
 * @param filename
 */
export declare function stripIllegalCharacters(filename: string): string;
