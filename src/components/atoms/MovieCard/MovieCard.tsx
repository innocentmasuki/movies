import { MovieData } from "@/types";
import { forwardRef } from "react";
import CursorShadow from "@/components/atoms/CursorShadow";
import CardContent from "./CardContent.tsx";

const MovieCard = forwardRef(
  (
    {
      movie,
      index,
      hoveredItem,
      setHoveredItem,
      smallCards,
    }: {
      hoveredItem?: number | null;
      movie: MovieData;
      index: number;
      smallCards: boolean;
      setHoveredItem: (index: number | null) => void;
    },
    ref,
  ) => {
    return (
      <div
        onMouseEnter={() => setHoveredItem(index)}
        onMouseLeave={() => setHoveredItem(null)}
        className={`h-full w-full z-50  relative cursor-pointer rounded-2xl flex ${smallCards ? "flex-row" : "flex-col"} gap-4 overflow-hidden group`}
      >
        <CardContent movie={movie} smallCards={smallCards} />
        <CursorShadow ref={index === hoveredItem ? (ref as never) : null} />
      </div>
    );
  },
);

export default MovieCard;
