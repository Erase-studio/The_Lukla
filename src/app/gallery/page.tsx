import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta, darkPrimary, darkSecondary } from "@/components/ClosingCta";
import { GalleryGrid, type GalleryItem } from "@/components/GalleryGrid";
import { PageHeader } from "@/components/PageHeader";
import { IconArrowRight } from "@/components/icons";
import { images } from "@/lib/images";
import { getGalleryPhotos, getPlates } from "@/lib/local-photos";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Plates from The Lukla's Himalayan and South Indian kitchen in Niagara Falls, NY.",
};

export default function Gallery() {
  const plates = getPlates();

  // Laid out on a 6-column grid (2 on phones); spans are chosen so the tiles lock together.
  const curated: (GalleryItem | false | undefined)[] = [
    {
      src: "/thali-plate.png",
      alt: "A thali with rice, dal, curries and raita",
      caption: "Thali",
      kind: "plate",
      span: "col-span-2 row-span-2 md:col-span-3",
    },
    plates.momo && {
      src: plates.momo.src,
      alt: "Momos with tomato achar",
      caption: "Momo",
      kind: "plate",
      span: "md:col-span-2",
    },
    plates.chai && {
      src: plates.chai.src,
      alt: "A cup of tea on a saucer",
      caption: "Tea",
      kind: "plate",
      span: "",
    },
    {
      src: images.falls,
      alt: "The Maid of the Mist boat in the spray below Horseshoe Falls",
      caption: "Niagara Falls, three minutes away",
      kind: "photo",
      span: "col-span-2 md:col-span-3",
    },
    {
      src: images.spices,
      alt: "Whole spices: cinnamon, cardamom, peppercorns, cumin and dried chillies",
      caption: "Whole spices",
      kind: "photo",
      span: "row-span-2 md:col-span-2",
    },
    plates.dosa && {
      src: plates.dosa.src,
      alt: "Masala dosa with sambar and coconut chutney",
      caption: "Masala dosa",
      kind: "plate",
      span: "md:col-span-2 md:row-span-2",
    },
    plates.biryani && {
      src: plates.biryani.src,
      alt: "Biryani in a clay bowl",
      caption: "Biryani",
      kind: "plate",
      span: "md:col-span-2 md:row-span-2",
    },
  ];

  // Photos the restaurant adds to /public/gallery lead the page.
  const uploaded: GalleryItem[] = getGalleryPhotos().map((photo) => ({
    src: photo.src,
    alt: photo.caption,
    caption: photo.caption,
    kind: "photo",
    span: "col-span-2 md:col-span-3 md:row-span-2",
  }));

  const items = [...uploaded, ...curated.filter((item): item is GalleryItem => Boolean(item))];

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="From our kitchen"
        intro="Plates from both sides of the kitchen, and the view just down the road. Tap any photo to see it larger."
      />

      <GalleryGrid items={items} />

      <ClosingCta
        eyebrow="Hungry yet?"
        title="Taste it in person"
        body="Everything here is on the menu, cooked to order every day from breakfast to late dinner."
      >
        <Link href="/menu" className={darkPrimary}>
          See the menu
          <IconArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/contact" className={darkSecondary}>
          Plan your visit
        </Link>
      </ClosingCta>
    </>
  );
}
