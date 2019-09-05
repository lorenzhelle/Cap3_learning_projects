export const reverseString = (str: string): string =>
   str
      .toLowerCase()
      .split("")
      .reverse()
      .join("");
