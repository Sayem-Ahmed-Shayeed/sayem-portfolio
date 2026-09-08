import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const linkSchema = z.object({
  label: z.string(),
  url: z.string().url()
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    status: z.string().optional(),
    role: z.string().optional(),
    team: z.string().optional(),
    image: z.string().optional(),
    alt: z.string().optional(),
    description: z.string(),
    technologies: z.array(z.string()).default([]),
    links: z.array(linkSchema).default([])
  })
});

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    authors: z.array(z.string()),
    venue: z.string(),
    status: z.string().optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    alt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    links: z.array(linkSchema).default([])
  })
});

const datasets = defineCollection({
  loader: glob({ base: './src/content/datasets', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    contributors: z.array(z.string()),
    publisher: z.string(),
    version: z.string().optional(),
    doi: z.string().optional(),
    image: z.string().optional(),
    alt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    links: z.array(linkSchema).default([])
  })
});

const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    featured: z.boolean().default(false),
    link: z.string().url().optional(),
    displayDate: z.string().optional()
  })
});

export const collections = { projects, publications, datasets, news };
