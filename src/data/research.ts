import type { CollectionEntry } from 'astro:content';

// Research areas for the research map. A work belongs to an area when its title or tags match;
// `short` is the label used on narrow screens.
export const areas = [
  { name: 'Healthcare AI', short: 'Health', match: /health|medical|dental|mental|clinical/i },
  { name: 'Agriculture AI', short: 'Agri', match: /agricultur|\btea\b|crop|farm/i },
  { name: 'Computer Vision', short: 'Vision', match: /vision|imag|radiograph|detection/i },
  { name: 'NLP', short: 'NLP', match: /\bnlp\b|\btext\b|language/i },
  { name: 'Explainable AI', short: 'XAI', match: /explainab|interpretab|grad-cam/i },
];

export type Work = {
  id: string;
  href: string;
  title: string;
  kind: 'Paper' | 'Dataset';
  venue: string;
  areas: string[];
};

const shortVenue = (venue: string, year: number) =>
  venue.includes('ICML') ? `MusIML workshop, ICML ${year}` : venue.includes('QPAIN') ? `IEEE QPAIN ${year}` : venue.split('—')[0].trim();

// Papers first, then datasets, in the order the page lists them.
export function buildWorks(pubs: CollectionEntry<'publications'>[], sets: CollectionEntry<'datasets'>[]): Work[] {
  const rows = [
    ...pubs.map(p => ({ id: p.id, d: p.data, kind: 'Paper' as const, venue: shortVenue(p.data.venue, p.data.year) })),
    ...sets.map(s => ({ id: s.id, d: s.data, kind: 'Dataset' as const, venue: s.data.publisher })),
  ];
  return rows.map(r => {
    const text = [r.d.title, ...r.d.tags].join(' | ');
    return {
      id: r.id,
      href: `#work-${r.id}`,
      title: r.d.shortTitle ?? r.d.title.split(':')[0].trim(),
      kind: r.kind,
      venue: r.venue,
      areas: areas.filter(a => a.match.test(text)).map(a => a.name),
    };
  });
}

export const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`;
