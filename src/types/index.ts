export interface AditionalData {
  id: string;
  tmdb_id: number;
  imdb_id: string;
  language: string;
  title: string;
  url: string;
  trailer: VideoData;
  videos: VideoData[];
}

export interface VideoData {
  id: string;
  youtube_video_id: string;
  youtube_channel_id: string;
  youtube_thumbnail: string;
  title: string;
  thumbnail: string;
  language: string;
  categories: string[];
  published: string; // Ideally you'd use a robust Date type here
  views: number;
}

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
  additional: AditionalData;
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
