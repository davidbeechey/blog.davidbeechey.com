import { getCollection } from "astro:content";

let posts = await getCollection("blog");

import.meta.env.PROD && (posts = posts.filter((post) => !post.data.draft));

// Get all of the tags and how many times they are used
export const tags = posts.reduce((acc, post) => {
  post.data.tags?.forEach((tag) => {
    acc[tag] ? acc[tag]++ : (acc[tag] = 1);
  });
  return acc;
}, {} as Record<string, number>);
