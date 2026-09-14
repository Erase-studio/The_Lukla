import Image from "next/image";
import { images } from "@/lib/images";
import { Reveal } from "@/components/Reveal";
import { getHeroPlates } from "@/lib/local-photos";

export const metadata = {
  title: "Gallery · The Lukla",
  description:
    "Photos of the food, the dining room, and the views at The Lukla Himalayan & South Indian Kitchen, Niagara Falls, NY.",
};

// Gallery mixes local real photos with curated Unsplash images so it always
// has content even before the restaurant uploads their own shots.
async function getGalleryPhotos() {
  const plates = await Promise.resolve(getHeroPlates());

  // Local photos from /public
  const local: { src: string; alt: string; aspect: string }[] = [
    {
      src: "/dining-room.jpg",
      alt: "The dining room — warm periwinkle walls, wooden chairs, soft lighting",
      aspect: "aspect-[4/3]",
    },
    {
      src: "/thali-plate.png",
      alt: "A thali with rice, dal, curries and raita",
      aspect: "aspect-square",
    },
  ];

  // Plate photos the restaurant has dropped in
  for (const plate of plates) {
    local.push({
      src: plate.src,
      alt: plate.slot.charAt(0).toUpperCase() + plate.slot.slice(1),
      aspect: "aspect-square",
    });
  }

  // Supplementary Unsplash photos
  const stock: { src: string; alt: string; aspect: string }[] = [
    {
      src: images.dosa,
      alt: "Masala dosa with sambar and chutney",
      aspect: "aspect-[3/4]",
    },
    {
      src: images.biryani,
      alt: "Goat biryani with saffron rice",
      aspect: "aspect-[3/4]",
    },
    {
      src: images.momo,
      alt: "Steamed chicken momos",
      aspect: "aspect-[3/4]",
    },
    {
      src: images.spices,
      alt: "Whole spices — the foundation of both cuisines",
      aspect: "aspect-[3/4]",
    },
    {
      src: images.falls,
      alt: "Niagara Falls — three minutes from the restaurant",
      aspect: "aspect-[16/9]",
    },
  ];

  return [...local, ...stock];
}

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();

  return (
    <main className="pt-[120px] lg:pt-[140px]">
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <p className="eyebrow">Gallery</p>
            <h1 className="mt-5 font-display text-[clamp(2.8rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-ink">
              The food, the room, the view
            </h1>
          </Reveal>

          {/* Responsive masonry-style grid using CSS columns */}
          <div className="mt-16 columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-6">
            {photos.map((photo, i) => (
              <Reveal key={photo.src + i} delay={(i % 3) * 0.08}>
                <div
                  className={`relative mb-4 overflow-hidden rounded-[18px] bg-wash lg:mb-6 ${photo.aspect}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-soft hover:scale-[1.04]"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 text-[15px] text-stone">
            <p>
              Real photos of our dining room and food are added as we go. If you
              have visited us and would like to share a photo, send it to{" "}
              <a
                href="mailto:info@thelukla.com"
                className="text-cobalt underline decoration-cobalt/30 underline-offset-4 transition-colors hover:decoration-cobalt"
              >
                info@thelukla.com
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
