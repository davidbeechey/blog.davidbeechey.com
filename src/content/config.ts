import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updated: z
      .string()
      .or(z.date())
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    image: z.string().optional(),
    alt: z
      .string()
      .optional()
      .refine((val) => val !== "", {
        message: "alt text is required if image is present",
      }),
    author: z.string(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };
