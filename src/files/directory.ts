import os from "os";
import { join } from "path";
import { env, platform } from "process";
import { hasAnyExtension, readDir, stat, ensureFilePathExists } from "../extensions/file";

/**
 * Walks the given directory, and it's subdirectories and find
 * @param directory The directory to check
 * @param extensions The extension to match
 *
 * @param fileList **recursive calls variable*8
 */
export async function walk(
  directory: string,
  extensions: string[] = [],
  fileList: string[] = []
) {
  const files = await readDir(directory);

  for (const file of files) {
    const details = await stat(join(directory, file));
    if (details.isDirectory())
      fileList = await walk(join(directory, file), extensions, fileList);
    else {
      if (extensions === null || hasAnyExtension(file, extensions)) {
        fileList.push(join(directory, file));
      }
    }
  }

  return fileList;
}

/**
 * Get the full path to the app data directory
 *
 * @param append This path is appended to the app data directory
 *
 * @return string The path to the app data directory
 */
export function getAppDataDirectory(append: string = ""): string {
  let data = "";

  switch (platform) {
    case "win32":
      data = env.APPDATA || join(os.homedir(), "AppData", "Roaming");
      break;
    case "darwin":
      data = join(join(os.homedir(), "Library"), "Application Support", name);
      break;
    case "linux":
      data = join(
        env.XDG_DATA_HOME || join(os.homedir(), ".local", "share"),
        name
      );
      break;
  }

  return join(data, append);
}

/**
 * Get the full path to the application root directory
 * 
 * @param path 
 */
export async function getAppRootDirectory(path: string) : Promise<string> {
  let directory = getAppDataDirectory("Flux Player");

  await ensureFilePathExists(directory);

  return join(directory, path);
}