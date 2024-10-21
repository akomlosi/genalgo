import { ALLOWED_CHARSET } from "./config";

export const getRandomNumber = (max: number): number => {
  return Math.floor(Math.random() * (max - 1)) + 1;
};

export const generateDNS = (limit: number) => {
  let dns: string = "";
  for (let i = 0; i < limit; i++) {
    const rand = getRandomNumber(ALLOWED_CHARSET.length - 1);
    dns += ALLOWED_CHARSET[rand];
  }
  return dns;
};

// Create random genes for mutation
export const getRandomCharacter = (): string => {
  return ALLOWED_CHARSET.charAt(getRandomNumber(ALLOWED_CHARSET.length));
};
