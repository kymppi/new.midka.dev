import { defineCollection, z } from "astro:content";

const definedTags = {
  astro: {
    name: "Astro",
    color: "orange",
  },
  website: {
    name: "Website",
    color: "green",
  },
  nextjs: {
    name: "Next.js",
    color: "purple",
  },
  mantine: {
    name: "Mantine",
    color: "blue",
  },
};

const projectsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    link: z.string(),
    github_link: z.string().optional(),
    stack: z.array(z.string()),
    tags: z.array(z.string()).transform((tags) => {
      if (!tags) return [];

      return tags.map((tag) => {
        if (!(definedTags as any)[tag])
          throw new Error(`Tag ${tag} is not defined in definedTags`);

        return (definedTags as any)[tag];
      }) as { name: string; color: string }[];
    }),
    publishDate: z
      .number()
      .transform((unix_time) => new Date(unix_time * 1000)), // Convert unix timestamp to Date, in milliseconds
    canonicalURL: z.string().url().optional(),
    draft: z.boolean().default(true),
  }),
});

export const collections = {
  projects: projectsCollection,
};
