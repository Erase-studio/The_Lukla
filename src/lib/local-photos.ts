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

export type Photo = { src: string; width: number; height: number };

// Pixel size from the file header (PNG, WebP, JPEG), so a photo can be framed in its own shape.
// JPEGs from phones are often stored sideways with an EXIF orientation tag; that case swaps width and height.
function readDimensions(buf: Buffer): { width: number; height: number } | null {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }

  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let orientation = 1;
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      if (marker === 0xe1 && buf.toString("ascii", i + 4, i + 8) === "Exif") {
        const tiff = i + 10;
        const le = buf.toString("ascii", tiff, tiff + 2) === "II";
        const u16 = (o: number) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
        const u32 = (o: number) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
        const ifd = tiff + u32(tiff + 4);
        for (let k = 0; k < u16(ifd); k++) {
          const entry = ifd + 2 + k * 12;
          if (u16(entry) === 0x0112) orientation = u16(entry + 8);
        }
      }
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        const height = buf.readUInt16BE(i + 5);
        const width = buf.readUInt16BE(i + 7);
        return orientation >= 5 ? { width: height, height: width } : { width, height };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }

  return null;
}

// The outside of the restaurant, from /public. The name tolerates "exterior" and "exterrior".
const EXTERIOR_NAME = /^restaurant[_-]?exter+ior$/i;

export function getExteriorPhoto(): Photo | null {
  const publicDir = path.join(process.cwd(), "public");
  try {
    const file = fs
      .readdirSync(publicDir)
      .find((f) => PHOTO_EXT.test(f) && EXTERIOR_NAME.test(path.parse(f).name));
    if (!file) return null;
    const size = readDimensions(fs.readFileSync(path.join(publicDir, file)));
    return { src: `/${file}`, width: size?.width ?? 4, height: size?.height ?? 3 };
  } catch {
    return null;
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
