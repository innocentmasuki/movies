const MovieGenre = ({ genre }: { genre?: string }) => {
  return (
    <div
      className={
        "flex flex-row items-center text-xs md:justify-start justify-center"
      }
    >
      {genre &&
        genre.split(",").map((g, index) => (
          <div className={"text-gray-400 flex flex-row"}>
            <div key={index} className={"text-center px-2  capitalize"}>
              {g.trim()}
            </div>
            {index !== genre.split(",").length - 1 && "•"}
          </div>
        ))}
    </div>
  );
};
export default MovieGenre;
