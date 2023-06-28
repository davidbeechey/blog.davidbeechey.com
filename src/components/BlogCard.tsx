import { formatDate } from "@/utils/date";
import type { CollectionEntry } from "astro:content";
import { useMemo } from "react";

type Props = CollectionEntry<"blog"> & {
  searchQuery?: string;
};

export const BlogCard = ({
  data: { image, alt, description, title, author, published, updated },
  slug,
  render,
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
      const prefix = "...";
      const searchQueryWithCasing = body.substring(
        startIndex,
        startIndex + match.length
      );
      return `${prefix}${searchQueryWithCasing}`;
    }
    return "";
  }, [body, searchQuery]);

  return (
    <a href={url} className="group flex w-full flex-col gap-4 pb-4 pt-8">
      <div className="space-y-4">
        {image && (
          <div className="mb-8">
          <img
            className="w-full rounded-xl shadow-lg"
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
                text={bodySearchQuery || ""}
                shouldBeBold={searchQuery}
              />
            </p>
          ) : (
            false
          )}
        </div>
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
