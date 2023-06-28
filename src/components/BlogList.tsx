import type { CollectionEntry } from "astro:content";
import { BlogCard } from "./BlogCard";
import { useState } from "react";
import { cn } from "@/utils/cn";

export const BlogList = ({
  posts,
  tags,
}: {
  posts: CollectionEntry<"blog">[];
  tags: Record<string, number>;
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="mt-8 space-y-8">
      <input
        type="text"
        placeholder="Search"
        className="w-full rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-opacity-50 dark:border-gray-200 dark:bg-black dark:text-gray-200"
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
      />
      {tags && Object.keys(tags).length > 0 && (
        <div className="flex flex-wrap items-center gap-1">
          <p className="mr-2 font-bold">Tags:</p>
          {Object.keys(tags).map((tag) => (
            <p
              key={tag}
              className={cn(
                "leading-sm inline-flex cursor-pointer items-center rounded-full px-3 py-1 text-xs font-bold uppercase text-white transition-colors",
                selected.includes(tag) && "bg-primary-800",
                !selected.includes(tag) && "bg-primary-600 hover:bg-primary-700"
              )}
              onClick={() => {
                selected.includes(tag)
                  ? setSelected((selected) => selected.filter((t) => t !== tag))
                  : setSelected((selected) => [...selected, tag]);
              }}
            >
              {tag}
            </p>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 divide-y divide-gray-200 transition-colors dark:divide-gray-700 lg:grid-cols-1">
        {getFilteredPosts(posts, selected, searchQuery).map((post) => (
          <BlogCard key={post.id} {...post} searchQuery={searchQuery} />
        ))}
      </div>
    </div>
  );
};

/**
 * Filters the posts based on the selected tags and search query, and sorts them by date
 * @param posts The posts to filter
 * @param selected The selected tags
 * @param searchQuery The search query
 */
const getFilteredPosts = (
  posts: CollectionEntry<"blog">[],
  selected: string[],
  searchQuery: string
) =>
  posts
    .filter(
      (post) =>
        post.data.tags?.some((tag) => selected.includes(tag)) ||
        selected.length === 0
    )
    .filter(
      (post) =>
        post.data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.data.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        post.data.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.data.published).getTime() -
        new Date(a.data.published).getTime()
    );
