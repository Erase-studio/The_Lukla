import fs from "node:fs";
import path from "node:path";

// Round, transparent plate cut-outs live in /public/plates, one file per dish (momo.png, dosa.png...).
// Components ask for a plate by name, so a new photo appears as soon as its file is added.

const PLATES_DIR = path.join(process.cwd(), "public", "plates");
const IMAGE_EXT = /\.(png|webp|avif)$/i;

export type Plate = { name: string; src: string };

export function getPlates(): Record<string, Plate> {
  let files: string[];
  try {
    files = fs.readdirSync(PLATES_DIR);
  } catch {
    return {};
  }
  return Object.fromEntries(
    files
      .filter((file) => IMAGE_EXT.test(file))
      .map((file) => {
        const name = path.parse(file).name.toLowerCase();
        return [name, { name, src: `/plates/${file}` }];
      }),
  );
}
