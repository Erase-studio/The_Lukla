import Image from "next/image";
import type { Plate } from "@/lib/local-photos";

// A round plate cut-out, or a quiet disc with the dish names when there's no photo yet.
export function PlateArt({
  plate,
  alt,
  fallback,
  sizes,
  className = "",
}: {
  plate?: Plate;
  alt: string;
  fallback: string;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`relative aspect-square ${className}`}>
      {plate ? (
        <Image
          src={plate.src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain drop-shadow-[0_24px_30px_rgba(21,34,61,0.26)]"
        />
      ) : (
        <div className="grid h-full w-full place-items-center rounded-full bg-white/60 p-[16%] text-center ring-1 ring-ink/10">
          <p className="font-display text-[clamp(1.05rem,1.8vw,1.5rem)] leading-snug text-ink/70">
            {fallback}
          </p>
        </div>
      )}
    </div>
  );
}
