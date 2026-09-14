import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta, darkPrimary, darkSecondary } from "@/components/ClosingCta";
import { GalleryGrid, type GalleryItem, type GallerySection } from "@/components/GalleryGrid";
import { PageHeader } from "@/components/PageHeader";
import { IconArrowRight } from "@/components/icons";
import { images } from "@/lib/images";
import { getGalleryPhotos, getPlates } from "@/lib/local-photos";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Plates from The Lukla's Himalayan and South Indian kitchen in Niagara Falls, NY.",
};

const present = (item: GalleryItem | false | undefined): item is GalleryItem => Boolean(item);

export default function Gallery() {
  const plates = getPlates();

  // Laid out on a 6-column grid (2 on phones); spans are chosen so the tiles lock together.
  const kitchen: (GalleryItem | false | undefined)[] = [
    {
      src: "/thali-plate.webp",
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
      span: "",
    },
    plates.chai && {
      src: plates.chai.src,
      alt: "A cup of tea on a saucer",
      caption: "Tea",
      kind: "plate",
      span: "",
    },
    plates.thukpa && {
      src: plates.thukpa.src,
      alt: "A bowl of noodle soup",
      caption: "Noodle soup",
      kind: "plate",
      span: "",
    },
    // A photo crops well into the one wide, short tile; round plates need square ones.
    {
      src: images.spices,
      alt: "Whole spices: cinnamon, cardamom, peppercorns, cumin and dried chillies",
      caption: "Whole spices",
      kind: "photo",
      span: "col-span-2 md:col-span-3",
    },
    plates.tandoor && {
      src: plates.tandoor.src,
      alt: "Tandoori chicken drumsticks on green chutney",
      caption: "Tandoori chicken",
      kind: "plate",
      span: "md:col-span-2 md:row-span-2",
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

  // Photos the restaurant adds to /public/gallery get their own chapter at the top.
  const uploaded: GalleryItem[] = getGalleryPhotos().map((photo) => ({
    src: photo.src,
    alt: photo.caption,
    caption: photo.caption,
    kind: "photo",
    span: "col-span-2 md:col-span-3 md:row-span-2",
  }));

  const sections: GallerySection[] = [
    ...(uploaded.length
      ? [{ id: "the-restaurant", title: "The restaurant", intro: "Inside The Lukla.", items: uploaded }]
      : []),
    {
      id: "from-the-kitchen",
      title: "From the kitchen",
      intro: "Plates from both sides of the menu. Tap any photo to see it larger.",
      items: kitchen.filter(present),
    },
    {
      id: "down-the-road",
      title: "Down the road",
      intro: "Niagara Falls State Park is about three minutes away by car.",
      items: [
        {
          src: images.falls,
          alt: "The Maid of the Mist boat in the spray below Horseshoe Falls",
          caption: "Niagara Falls",
          kind: "photo",
          span: "col-span-2 row-span-2 md:col-span-6",
        },
      ],
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="From our kitchen"
        intro="Plates from both sides of the kitchen, and the view just down the road."
      />

      <GalleryGrid sections={sections} />

      <ClosingCta
        eyebrow="Hungry yet?"
        title="Taste it in person"
        body="Everything here is on the menu, cooked to order every day from breakfast to late dinner."
      >
        <Link href="/menu" className={`group ${darkPrimary}`}>
          Explore the menu
          <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <Link href="/contact" className={darkSecondary}>
          Plan your visit
        </Link>
      </ClosingCta>
    </>
  );
}
