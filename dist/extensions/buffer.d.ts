/// <reference types="node" />
/**
 * Convert a Node buffer to a native JavaScript ArrayBuffer
 *
 * @param buffer
 *
 * @returns {ArrayBuffer}
 */
export declare function toArrayBuffer(buffer: Buffer): ArrayBuffer;
/**
 * Read a file from the disk into an ArrayBuffer
 * @param filename
 */
export declare function readFileAsArrayBuffer(filename: string): Promise<ArrayBuffer>;
