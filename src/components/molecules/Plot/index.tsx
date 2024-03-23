import { useState } from "react";

const Plot = ({ plot }: { plot?: string }) => {
  const [showMore, setShowMore] = useState(false);

  if (!plot) return null;
  return (
    <article className={"text-gray-400 mb-10 text-center md:text-left"}>
      <span
        className={`text-gray-400 text-center md:text-left ${!showMore ? "line-clamp-2" : ""}`}
      >
        {plot}
      </span>
      <span
        onClick={() => setShowMore(!showMore)}
        className={"text-white cursor-pointer"}
      >
        {showMore ? "Show Less" : "Show More"}
      </span>
    </article>
  );
};

export default Plot;
