import { formatDate } from "@/utils/date";
import type { CollectionEntry } from "astro:content";

export const BlogCard = ({
  data: { image, alt, description, title, author, published, updated },
  slug: url,
  body,
  searchQuery = "",
}: CollectionEntry<"blog"> & {
  searchQuery?: string;
}) => (
  <a href={url} className="group flex w-full flex-col gap-4 pb-4 pt-8">
    <div className="space-y-4">
      {image && (
        <div className="mb-8">
          <img
            className="w-full rounded-xl shadow-lg dark:shadow-gray-900"
            src={image}
            alt={alt}
            loading="lazy"
            width="100%"
            height="auto"
          />
        </div>
      )}
      <h1 className="font-title text-5xl font-medium decoration-sky-600 decoration-4 group-hover:underline">
        <BoldedText text={title} shouldBeBold={searchQuery} />
      </h1>
      <p className="line-clamp-2 text-2xl">
        <BoldedText text={description} shouldBeBold={searchQuery} />
      </p>
      <div>
        {searchQuery ? (
          <p className="mt-4 line-clamp-1 italic">
            <BoldedText
              text={getBodySearchQuery(body, searchQuery)}
              shouldBeBold={searchQuery}
            />
          </p>
        ) : (
          false
        )}
      </div>
    </div>
    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
      <span>{author}</span>
      {updated && <span>{formatDate(published)}</span>}
    </div>
  </a>
);

/**
 * Makes the text bold where the search query matches
 * @param text The entire piece of text
 * @param shouldBeBold The substring that should be bolded
 */
const BoldedText = ({
  text,
  shouldBeBold,
}: {
  text: string;
  shouldBeBold: string;
}) => {
  const regex = new RegExp(shouldBeBold, "gi");
  const textArray = text.split(regex);

  return textArray.map((item, index) => (
    <>
      {item}
      {index !== textArray.length - 1 && (
        <span className="font-bold">{text.match(regex)![index]}</span>
      )}
    </>
  ));
};

/**
 * Gets the blog body text that matches the search query
 */
const getBodySearchQuery = (body: string, searchQuery: string) => {
  const regex = new RegExp(`.{0,10}${searchQuery}.{0,50}`, "gi");
  const match = body.match(regex)?.[0];
  if (match) {
    const startIndex = body.indexOf(match);
    const searchQueryWithCasing = body.substring(
      startIndex,
      startIndex + match.length
    );
    return `...${searchQueryWithCasing}`;
  }
  return "";
};
