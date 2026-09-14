// Google Places API (New) — server-side only.
// Requires GOOGLE_PLACES_API_KEY in .env.local
// Place ID lives alongside the Maps URL in menu-data.ts.

export const PLACE_ID = "ChIJO0zGfQBD04kRRgf8Ra4kKFA";

export type PlaceReview = {
  name: string;
  rating: number;
  text: string;
  relativePublishTimeDescription: string; // e.g. "3 months ago"
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
};

export type PlaceData = {
  rating: number;
  userRatingCount: number;
  reviews: PlaceReview[];
};

// Fallback data shown when the API key is absent or the request fails.
// Keep this in sync with reality so the site never shows obviously wrong numbers.
export const FALLBACK: PlaceData = {
  rating: 4.3,
  userRatingCount: 566,
  reviews: [
    {
      name: "fallback-1",
      rating: 5,
      text: "We tried the jhol momo and it was absolutely delicious. It instantly took me back to my college days. We stayed over two hours while it rained outside and no one ever rushed us.",
      relativePublishTimeDescription: "3 months ago",
      authorAttribution: {
        displayName: "Gaurab G.",
        uri: "",
        photoUri: "",
      },
    },
    {
      name: "fallback-2",
      rating: 5,
      text: "On our first day he offered us masala chai on the house, and the next day added a generous portion of rice just to make sure we were happy. Spacious, clean and genuinely welcoming.",
      relativePublishTimeDescription: "3 months ago",
      authorAttribution: {
        displayName: "Sharmin A.",
        uri: "",
        photoUri: "",
      },
    },
    {
      name: "fallback-3",
      rating: 5,
      text: "Went in during heavy rain and it felt even better to sit down to something warm. The salad and rice dishes were fresh and well done. Ended with gulab jamun, the perfect comforting dessert.",
      relativePublishTimeDescription: "3 months ago",
      authorAttribution: {
        displayName: "Puppala V.",
        uri: "",
        photoUri: "",
      },
    },
  ],
};

/**
 * Fetches place data (rating, review count, top reviews) from the Google
 * Places API (New). Cached for one hour via Next.js fetch semantics so the
 * page stays fast while still reflecting recent reviews.
 *
 * Falls back to FALLBACK data if the API key is missing or the request fails,
 * so the site never breaks in environments where the key is not configured.
 */
export async function getPlaceData(): Promise<PlaceData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.warn("[google-reviews] GOOGLE_PLACES_API_KEY not set — using fallback data.");
    return FALLBACK;
  }

  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        // Request only the fields we need to minimise billing.
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
      // Revalidate every hour — fresh enough for a small restaurant page.
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[google-reviews] Places API error ${res.status}: ${body}`);
      return FALLBACK;
    }

    const json = await res.json();

    // The Places API returns an empty object when the place has no reviews yet.
    if (!json.reviews || !Array.isArray(json.reviews)) {
      return { ...FALLBACK, rating: json.rating ?? FALLBACK.rating, userRatingCount: json.userRatingCount ?? FALLBACK.userRatingCount };
    }

    return {
      rating: json.rating ?? FALLBACK.rating,
      userRatingCount: json.userRatingCount ?? FALLBACK.userRatingCount,
      reviews: json.reviews as PlaceReview[],
    };
  } catch (err) {
    console.error("[google-reviews] Fetch failed:", err);
    return FALLBACK;
  }
}
