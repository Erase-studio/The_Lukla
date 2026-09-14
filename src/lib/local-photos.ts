import fs from "node:fs";
import path from "node:path";

// Photos the restaurant drops into /public are picked up by file name, so the site
// shows real food and the real dining room as soon as the files exist.

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_EXT = /\.(png|webp|avif|jpe?g)$/i;
const CUTOUT_EXT = /\.(png|webp|avif)$/i;

export const PLATE_SLOTS = ["momo", "dosa", "biryani", "chai"] as const;
export type PlateSlot = (typeof PLATE_SLOTS)[number];

export type Plate = {
  slot: PlateSlot;
  src: string;
  // Transparent PNG/WebP cutouts sit on the page as-is; JPGs are cropped into a round plate.
  cutout: boolean;
};

function listDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

export function getHeroPlates(): Plate[] {
  const files = listDir(path.join(PUBLIC_DIR, "hero"));
  return PLATE_SLOTS.flatMap((slot) => {
    const file = files.find(
      (f) => IMAGE_EXT.test(f) && path.parse(f).name.toLowerCase() === slot,
    );
    return file
      ? [{ slot, src: `/hero/${file}`, cutout: CUTOUT_EXT.test(file) }]
      : [];
  });
}
