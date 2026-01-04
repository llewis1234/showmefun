# ShowMeFun UI (Next.js + Supabase)

A small, opinionated front-end designed for discovery: click vibe chips → browse events → share links.

## Setup

1) Install deps
```bash
npm install
```

2) Configure environment
Copy `.env.example` to `.env.local` and fill in:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3) Run
```bash
npm run dev
```

## Supabase requirements

- Table: `public.events`
- Columns: `id`, `title`, `description`, `start_date`, `end_date`, `event_date`, `event_time`, `location`, `vibe_tags`, `url`, `source_url`, `source`, `is_verified`
- `vibe_tags` should be `text[]`

### RLS (Row Level Security)
Because there is no login in this proof of concept, you must allow read access for the anon role:

Example policy (Supabase SQL editor):
```sql
alter table public.events enable row level security;

create policy "Public can read events"
on public.events
for select
to anon
using (true);
```

## Notes

- Vibe filtering uses Postgres array containment: `contains(vibe_tags, ['Family','Holiday'])`.
- Text search uses ILIKE on `title` and `description`.
- Dataset size (<500 rows) keeps things simple and fast.
