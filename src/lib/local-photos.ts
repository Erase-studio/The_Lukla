import fs from "node:fs";
import path from "node:path";

// Round, transparent plate cut-outs live in /public/plates, one file per dish (momo.png, dosa.png...).
// Components ask for a plate by name, so a new photo appears as soon as its file is added.

const PLATES_DIR = path.join(process.cwd(), "public", "plates");
const IMAGE_EXT = /\.(png|webp|avif)$/i;

export type Plate = { name: string; src: string };

export type GalleryPhoto = { src: string; caption: string };

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const PHOTO_EXT = /\.(png|webp|avif|jpe?g)$/i;

// "02-dining-room.jpg" becomes "Dining room". A leading number only sets the order.
function captionFrom(file: string) {
  const words = path.parse(file).name.replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

// Restaurant photos dropped into /public/gallery appear on the gallery page, sorted by file name.
export function getGalleryPhotos(): GalleryPhoto[] {
  try {
    return fs
      .readdirSync(GALLERY_DIR)
      .filter((file) => PHOTO_EXT.test(file))
      .sort()
      .map((file) => ({ src: `/gallery/${file}`, caption: captionFrom(file) }));
  } catch {
    return [];
  }
}

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
