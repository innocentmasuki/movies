import { MovieData } from "@/types";
import { Link } from "react-router-dom";
import MovieCard from "@/components/MovieCard/MovieCard.tsx";
import { useRef, useState } from "react";

const Movies = ({ movies }: { movies: MovieData[] }) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>();
  const shinyRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (hoveredItem !== null && shinyRef.current) {
      const gridItem = event.currentTarget.childNodes[hoveredItem!];
      const rect = (gridItem as HTMLDivElement)?.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      shinyRef.current.style.transform = `translate(${x - 115}px, ${y - 115}px)`;
    }
  };
  return (
    <section
      onMouseMove={handleMouseMove}
      className={
        "w-full gap-x-5 gap-y-10 group grid py-4 grid-cols-2 md:grid-cols-5"
      }
    >
      {movies.length > 0 &&
        movies.map((movie: MovieData, index) => {
          return (
            <Link key={movie.imdbID} to={`/${movie.imdbID}`}>
              <MovieCard
                ref={shinyRef}
                setHoveredItem={setHoveredItem}
                hoveredItem={hoveredItem}
                movie={movie}
                index={index}
              />
            </Link>
          );
        })}
    </section>
  );
};

export default Movies;
