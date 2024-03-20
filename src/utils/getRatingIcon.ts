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
    case "tv-y":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/TV-Y_icon.svg/50px-TV-Y_icon.svg.png";
    case "tv-y7":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/TV-Y7_icon.svg/50px-TV-Y7_icon.svg.png";
    case "tv-g":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/TV-G_icon.svg/50px-TV-G_icon.svg.png";
    case "tv-pg":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/TV-PG_icon.svg/50px-TV-PG_icon.svg.png";
    case "tv-14":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/TV-14_icon.svg/50px-TV-14_icon.svg.png";
    case "tv-ma":
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/TV-MA_icon.svg/50px-TV-MA_icon.svg.png";
    default:
      return undefined;
  }
};

export const getLogo = (logo: string) => {
  switch (logo.toLowerCase()) {
    case "netflix":
      return "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";
    case "internet movie database":
      return "https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg";
    case "rotten tomatoes":
      return "https://upload.wikimedia.org/wikipedia/commons/5/5b/Rotten_Tomatoes.svg";
    case "metacritic":
      return "https://upload.wikimedia.org/wikipedia/commons/c/ce/Metacritic_logo_original.svg";
    default:
      return undefined;
  }
};
