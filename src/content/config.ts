import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z
      .date()
      .or(z.date())
      .transform((val) => new Date(val)),
    updated: z
      .date()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    alt: z
      .string()
      .optional()
      .refine((val) => val !== "", {
        message: "alt text is required if image is present",
      }),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };
