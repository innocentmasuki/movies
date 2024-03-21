import { AditionalData, MovieData } from "@/types/index.ts";
import { BASE_URL } from "@/constants";
import { getRandomWord } from "@/utils/getRandomWord.ts";

export const getAdditionalDataByIMDBID = async (
  imdbID: `${"tt"}${number}`,
  type = "movies",
): Promise<AditionalData> => {
  if (!imdbID) throw new Error("IMDB ID is required");
  if (!imdbID.startsWith("tt")) throw new Error("Invalid IMDB ID");
  const response = await fetch(
    `https://api.kinocheck.de/${type}?imdb_id=${imdbID}`,
    {
      mode: "no-cors",
    },
  );
  if (!response.ok) {
    return {} as AditionalData;
  }
  const data = await response.json();
  if (Object.keys(data).length > 0) {
    return data;
  }
  return {} as AditionalData;
};

export const getMovies = async (): Promise<MovieData[]> => {
  const title = getRandomWord();
  const response = await fetch(
    `${BASE_URL}?s=${title}&apikey=bbb23874&type=movie`,
  );
  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  const data = await response.json();
  if (data.Search && data.Search.length > 0) {
    return data.Search;
  }
  throw new Error("Error fetching data");
};

export const searchMovie = async (query: string): Promise<MovieData[]> => {
  const response = await fetch(
    `${BASE_URL}?s=${query}&apikey=bbb23874&type=movie`,
  );
  const data = await response.json();
  if (data.Search && data.Search.length > 0) {
    return data;
  }
  throw new Error("Error fetching data");
};

export const getMovieByIMDBID = async (
  imdbID: `${"tt"}${number}`,
  type = "movie",
): Promise<MovieData> => {
  if (!imdbID) throw new Error("IMDB ID is required");
  if (!imdbID.startsWith("tt")) throw new Error("Invalid IMDB ID");
  const response = await fetch(
    `${BASE_URL}?i=${imdbID}&apikey=bbb23874&type=${type}&plot=full`,
  );
  let additional = {};
  getAdditionalDataByIMDBID(imdbID, type === "movie" ? "movies" : "shows").then(
    (data) => {
      additional = data;
    },
  );
  const data = await response.json();
  if (Object.keys(data).length > 0) {
    return { ...data, additional };
  }
  throw new Error("Error fetching data");
};
