import { MovieData } from "@/types";
import { forwardRef } from "react";
import CursorShadow from "@/components/ui/CursorShadow";
import CardContent from "@/components/MovieCard/CardContent.tsx";

const MovieCard = forwardRef(
  (
    {
      movie,
      index,
      hoveredItem,
      setHoveredItem,
    }: {
      hoveredItem?: number | null;
      movie: MovieData;
      index: number;
      setHoveredItem: (index: number | null) => void;
    },
    ref,
  ) => {
    return (
      <div
        onMouseEnter={() => setHoveredItem(index)}
        onMouseLeave={() => setHoveredItem(null)}
        className={
          "h-full w-full z-50  relative cursor-pointer rounded-2xl flex flex-col gap-4 overflow-hidden group"
        }
      >
        <CardContent movie={movie} />
        <CursorShadow ref={index === hoveredItem ? (ref as never) : null} />
      </div>
    );
  },
);

export default MovieCard;
