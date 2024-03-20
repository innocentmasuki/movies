export interface MovieData {
  Title: string;
  Year: string;
  Rated: Rated;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string; // Assuming this should be a boolean instead
}

export interface Rating {
  Source: string;
  Value: string;
}

export type Rated = "R" | "PG-13" | "PG" | "G" | "NC-17";
