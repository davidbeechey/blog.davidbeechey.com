import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";

const parser = new MarkdownIt();

export const get = async (context) => {
  const posts = await getCollection("blog");

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    drafts: false,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.updated,
      author: post.data.author,
      description: post.data.description,
      categories: post.data.categories,
      link: post.slug,
      content: sanitizeHtml(parser.render(post.body)),
      draft: import.meta.env.PROD ? post.data.draft : false,
    })),
  });
};
