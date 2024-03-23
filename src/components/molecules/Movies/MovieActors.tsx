const MovieActors = ({ actors }: { actors?: string }) => {
  return (
    <div
      className={
        "flex text-gray-400 flex-row text-xs items-center md:justify-start justify-center"
      }
    >
      {actors &&
        actors.split(",").map((q, index) => (
          <div className={" flex flex-row"}>
            <div key={index} className={"text-center px-2  capitalize"}>
              {q.trim()}
            </div>
            {index !== actors.split(",").length - 1 && "•"}
          </div>
        ))}
    </div>
  );
};
export default MovieActors;
