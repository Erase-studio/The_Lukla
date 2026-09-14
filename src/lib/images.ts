const unsplash = (id: string, params: string) =>
  `https://images.unsplash.com/${id}?${params}`;

export const images = {
  spices: unsplash(
    "photo-1596040033229-a9821ebd058d",
    "auto=format&fit=crop&q=80&w=900&h=1125",
  ),
  // Olivier Guillard, "A Maiden Voyage" (Unsplash License)
  falls: unsplash(
    "photo-1493456548192-bb71fe1135b5",
    "auto=format&fit=crop&q=80&w=2400",
  ),
};
