const unsplash = (id: string, params: string) =>
  `https://images.unsplash.com/${id}?${params}`;

const portrait = "auto=format&fit=crop&q=80&w=900&h=1125";
const pill = "auto=format&fit=crop&q=80&w=480&h=240";

const ids = {
  mountains: "photo-1530273883449-aae8b023c196",
  momo: "photo-1638502338747-f7f368214cce",
  dosa: "photo-1668236543090-82eba5ee5976",
  thukpa: "photo-1617093727343-374698b1b08d",
  biryani: "photo-1589302168068-964664d93dc0",
  tandoori: "photo-1610057099443-fde8c4d50f91",
  spices: "photo-1596040033229-a9821ebd058d",
  // Olivier Guillard, "A Maiden Voyage" (Unsplash License)
  falls: "photo-1493456548192-bb71fe1135b5",
};

export const images = {
  falls: unsplash(ids.falls, "auto=format&fit=crop&q=80&w=2400"),
  spices: unsplash(ids.spices, portrait),
  momo: unsplash(ids.momo, portrait),
  dosa: unsplash(ids.dosa, portrait),
  biryani: unsplash(ids.biryani, portrait),
  pill: {
    momo: unsplash(ids.momo, pill),
    dosa: unsplash(ids.dosa, pill),
    tandoori: unsplash(ids.tandoori, pill),
    thukpa: unsplash(ids.thukpa, pill),
  },
};
