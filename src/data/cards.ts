import type { CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

// One shape for papers, datasets and projects, so every card layout reads the same facts.
export type Entry = {
  id: string;
  anchor: string;            // element id other sections link to (#work-…, #project-…)
  kind: 'paper' | 'dataset' | 'project';
  year: number;
  title: string;
  people: string[];
  venue?: string;            // short venue or publisher
  status?: string;
  summary: string;           // one or two sentences
  more?: string;             // longer text: abstract, dataset description, project note
  size?: string;             // dataset size, e.g. "9,935 samples"
  stack: string[];
  role?: string;
  team?: string;
  links: { label: string; url: string }[];
  image?: ImageMetadata;
  alt: string;
};

const shortVenue = (venue: string, year: number) =>
  venue.includes('ICML') ? `MusIML workshop, ICML ${year}` : venue.includes('QPAIN') ? `IEEE QPAIN ${year}` : venue.split('—')[0].trim();

const paragraphs = (body = '') => body.split(/\n\s*\n/).map(p => p.replace(/\s+/g, ' ').trim()).filter(Boolean);
const field = (body: string | undefined, name: string) => body?.match(new RegExp(`\\*\\*${name}:\\*\\*\\s*([^\\n]+)`))?.[1].trim();
const firstSentence = (text: string) => text.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? text;

export const isSelf = (name: string) => /sayem/i.test(name);

export function paperEntry(p: CollectionEntry<'publications'>): Entry {
  const d = p.data;
  const tldr = field(p.body, 'TL;DR');
  return {
    id: p.id, anchor: `work-${p.id}`, kind: 'paper', year: d.year, title: d.title, people: d.authors,
    venue: shortVenue(d.venue, d.year), status: d.status,
    summary: tldr ?? paragraphs(p.body)[0] ?? '',
    more: field(p.body, 'Abstract'),
    stack: [], links: d.links, image: d.image, alt: d.alt || `${d.title} figure`,
  };
}

export function datasetEntry(s: CollectionEntry<'datasets'>): Entry {
  const d = s.data;
  const text = paragraphs(s.body);
  return {
    id: s.id, anchor: `work-${s.id}`, kind: 'dataset', year: d.year, title: d.title.replace(/\.$/, ''), people: d.contributors,
    venue: d.publisher, status: d.version,
    summary: firstSentence(text[0] ?? ''),
    more: text.join(' '),
    size: d.tags.find(t => /^\d[\d,]*\s/.test(t)),
    stack: [], links: d.links, image: d.image, alt: d.alt || `${d.title} record`,
  };
}

export function projectEntry(p: CollectionEntry<'projects'>): Entry {
  const d = p.data;
  return {
    id: p.id, anchor: `project-${p.id}`, kind: 'project', year: d.date.getFullYear(), title: d.title, people: [],
    status: d.status, summary: d.description, more: paragraphs(p.body)[0],
    stack: d.technologies, role: d.role, team: d.team,
    links: d.links, image: d.image, alt: d.alt || `${d.title} preview`,
  };
}

export const list = (items: string[]) => new Intl.ListFormat('en-GB', { type: 'conjunction' }).format(items);
export const teamLabel = (team?: string) => (!team ? undefined : /solo/i.test(team) ? 'Solo project' : team.replace(/^./, c => c.toUpperCase()));
