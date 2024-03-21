import { ENGLISH_WORDS } from "@/constants";

export const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * ENGLISH_WORDS.length);
  return ENGLISH_WORDS[randomIndex];
};
