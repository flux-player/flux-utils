import { randomBytes } from "crypto";

/**
 * Generate a random string with the specified length
 *
 * @param length
 */
export function randomString(length: number): string {
  return randomBytes(length).toString("hex");
}

/**
 * Convert a node buffer to a string
 *
 * @param buffer
 * @param encoding
 */
export function bufferToString(buffer: Buffer, encoding = "utf8"): string {
  return buffer.toString(encoding);
}

/**
 * Removes path-illegal characters from a filename
 *
 * @param filename
 */
export function stripIllegalCharacters(filename: string): string {
  return filename.replace(/[/\\?%*:|"<>]/g, "-");
}
