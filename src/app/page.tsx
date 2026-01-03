'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'

type EventRow = {
  id: string
  title: string
  description?: string | null
  location?: string | null
  vibe_tags?: string[] | null
  start_date?: string | null
  event_date: string
  url?: string | null
  source_url?: string | null
}

export default function Home() {
  const [events, setEvents] = useState<EventRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true)

        const { data, error } = await supabase
          .from('events')
          .select('id,title,description,location,vibe_tags,start_date,event_date,url,source_url')
          // Primary sort: start_date (if you populate it)
          .order('start_date', { ascending: true })
          // Secondary sort: event_date (always present)
          .order('event_date', { ascending: true })

        if (error) {
          console.error('Supabase error:', error.message)
          throw error
        }

        setEvents(data ?? [])
      } catch (err) {
        console.error('Failed to fetch events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Optional: In case start_date is mostly null, do a client-side final sort using effective date
  const sortedEvents = useMemo(() => {
    const toTime = (d?: string | null) => (d ? new Date(d).getTime() : Number.POSITIVE_INFINITY)
    return [...events].sort((a, b) => {
      const aT = toTime(a.start_date ?? a.event_date)
      const bT = toTime(b.start_date ?? b.event_date)
      return aT - bT
    })
  }, [events])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl font-bold italic animate-pulse">Scanning for events...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-red-600 tracking-tighter italic mb-4">
          WHAT TO DO KC
        </h1>
        <p className="text-gray-600">Discover local vibes in Kansas City</p>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        {sortedEvents.length === 0 ? (
          <div className="text-center p-10 bg-white rounded-xl shadow-sm border">
            <p className="text-gray-500">No events found in the database.</p>
          </div>
        ) : (
          sortedEvents.map((event) => {
            const badgeDate = event.start_date ?? event.event_date ?? 'TBD'
            const canonicalUrl = event.url ?? event.source_url ?? null

            return (
              <div
                key={event.id}
                className="bg-neutral-900 text-white p-6 rounded-2xl shadow-xl border border-neutral-800 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded text-sm font-bold tracking-tight">
                  {badgeDate}
                </div>

                <h2 className="text-2xl font-bold mb-2 pr-24 uppercase tracking-tight">
                  {event.title}
                </h2>

                <p className="text-neutral-400 text-sm mb-4">
                  {event.location || 'Kansas City, MO'}
                </p>

                <p className="text-neutral-300 text-sm leading-relaxed mb-6 line-clamp-3">
                  {event.description || ''}
                </p>

                {event.vibe_tags?.length ? (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {event.vibe_tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-neutral-800 border border-neutral-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                {canonicalUrl ? (
                  <div className="mt-5">
                    <a
                      href={canonicalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-red-400 hover:text-red-300 underline"
                    >
                      View source
                    </a>
                  </div>
                ) : null}
              </div>
            )
          })
        )}
      </main>
    </div>
  )
}

