import { getCollection } from "astro:content";

const blogs = await getCollection("blog");

// Get all of the tags and how many times they are used
export const tags = blogs.reduce((acc, blog) => {
  blog.data.tags?.forEach((tag) => {
    acc[tag] ? acc[tag]++ : (acc[tag] = 1);
  });
  return acc;
}, {} as Record<string, number>);
