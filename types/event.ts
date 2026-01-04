export type EventRow = {
  id: string;
  created_at: string;
  updated_at: string | null;

  title: string | null;
  description: string | null;

  // Source fields
  source_url: string | null;
  url: string | null;
  source: string | null;
  source_event_id: string | null;

  // Time fields
  event_date: string | null;    // date
  event_time: string | null;    // time
  start_date: string | null;    // date
  end_date: string | null;      // date

  location: string | null;

  vibe_tags: string[] | null;   // text[]
  is_verified: boolean | null;

  enriched_at: string | null;
};
