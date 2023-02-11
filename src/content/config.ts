import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    link: z.string(),
    github_link: z.string().optional(),
    stack: z.array(z.string()),
    tags: z.array(z.string()),
    publishDate: z.string().transform((str) => new Date(str)),
    canonicalURL: z.string().url().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
