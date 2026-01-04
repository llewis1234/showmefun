export const DEFAULT_VIBES = [
  "Chill",
  "Family",
  "Kids",
  "Outdoor",
  "Food",
  "Music",
  "Arts",
  "Movies",
  "Holiday",
  "Community",
  "Educational",
  "Creative",
  "Free",
  "Date Night",
  "Late Night",
  "Sports",
  "Markets",
  "Comedy",
  "Weird",
] as const;

export type Vibe = typeof DEFAULT_VIBES[number];
