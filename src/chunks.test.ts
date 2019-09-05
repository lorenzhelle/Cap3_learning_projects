import { chunkArray } from "./chunks";

test("Check if chunkkArray exists", () => {
   expect(chunkArray).toBeDefined();
});

test("Chunk an array of 10 values with length of 2", () => {
   const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   const len: number = 2;
   const chunkArr = chunkArray(numbers, len);
   expect(chunkArr).toEqual([[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]);
});
