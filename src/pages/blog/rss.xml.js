import { BLOG_DESCRIPTION, BLOG_TITLE } from "@/consts";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function get(context) {
  const posts = await getCollection("blog");
  return rss({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    site: context.site,
    drafts: false,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.updated,
      author: post.data.author,
      description: post.data.description,
      categories: post.data.categories,
      link: `/blog/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
      draft: import.meta.env.PROD ? post.data.draft : false,
    })),
  });
}
