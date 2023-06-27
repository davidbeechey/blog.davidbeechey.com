import { formatDate } from "@/utils/date";
import type { CollectionEntry } from "astro:content";
import { useMemo } from "react";

type Props = CollectionEntry<"blog"> & {
  searchQuery?: string;
};

export const BlogCard = ({
  data: { image, alt, description, title, author, published, updated },
  slug,
  body,
  searchQuery = "",
}: Props) => {
  const url = `/blog/${slug}`;

  const bodySearchQuery = useMemo(() => {
    const regex = new RegExp(`.{0,10}${searchQuery}.{0,50}`, "gi");
    const match = body.match(regex)?.[0];
    if (match) {
      const startIndex = body.indexOf(match);
      console.log(startIndex);
      const prefix = "..."
      const searchQueryWithCasing = body.substring(
        startIndex,
        startIndex + match.length
      );
      return `${prefix}${searchQueryWithCasing}`;
    }
    return "";
  }, [body, searchQuery]);

  return (
    <a
      className="flex w-full flex-col justify-between gap-8 rounded-lg bg-white p-8 font-blog-text transition hover:shadow-lg"
      href={url}
    >
      <div>
        {image && (
          <img
            className="mb-4 w-full rounded-lg"
            src={image}
            alt={alt}
            loading="lazy"
            width="100%"
            height="auto"
          />
        )}
        <h1 className="font-blog-heading text-2xl font-medium">
          <BoldedText text={title} shouldBeBold={searchQuery} />
        </h1>
        <p className="line-clamp-2">
          <BoldedText text={description} shouldBeBold={searchQuery} />
        </p>
        {searchQuery ? (
          <p className="mt-4 line-clamp-1 italic">
            <BoldedText
              text={bodySearchQuery || ""}
              shouldBeBold={searchQuery}
            />
          </p>
        ) : (
          false
        )}
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-gray-500">{author}</span>
        {updated && (
          <span className="text-sm text-gray-500">{formatDate(published)}</span>
        )}
      </div>
    </a>
  );
};

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
