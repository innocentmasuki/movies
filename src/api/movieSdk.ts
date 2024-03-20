import { MovieData } from "@/types/index.ts";
import { BASE_URL } from "@/constants";

export const fetchMovies = async (): Promise<MovieData[]> => {
  const response = await fetch(
    `${BASE_URL}?s=three&apikey=bbb23874&type=movie`,
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

export const fetchMovieByIMDBID = async (
  imdbID: `${"tt"}${number}`,
): Promise<MovieData> => {
  if (!imdbID) throw new Error("IMDB ID is required");
  if (!imdbID.startsWith("tt")) throw new Error("Invalid IMDB ID");
  const response = await fetch(
    `${BASE_URL}?i=${imdbID}&apikey=bbb23874&type=movie`,
  );
  const data = await response.json();
  if (Object.keys(data).length > 0) {
    return data;
  }
  throw new Error("Error fetching data");
};
