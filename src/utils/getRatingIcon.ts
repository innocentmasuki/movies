import { Rated } from "@/types";

export const getRatingIcon = (rated: Rated) => {
  switch (rated.toLowerCase()) {
    case "r":
      return "https://upload.wikimedia.org/wikipedia/en/6/6b/MPA_R_RATING.svg";
    case "pg-13":
      return "https://upload.wikimedia.org/wikipedia/en/9/98/MPA_PG-13_RATING.svg";
    case "pg":
      return "https://upload.wikimedia.org/wikipedia/en/9/9a/MPA_PG_RATING.svg";
    case "g":
      return "https://upload.wikimedia.org/wikipedia/en/4/4f/MPA_G_RATING.svg";
    case "nc-17":
      return "https://upload.wikimedia.org/wikipedia/en/c/c0/MPA_NC-17_RATING.svg";
    default:
      return undefined;
  }
};

export const getLogos = (logo: string) => {
  switch (logo.toLowerCase()) {
    case "netflix":
      return "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";
    case "imdb":
      return "https://en.wikipedia.org/wiki/File:IMDB_Logo_2016.svg";

    default:
      return undefined;
  }
};
