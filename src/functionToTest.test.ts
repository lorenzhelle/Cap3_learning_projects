import { functions } from "./functionsToTest";

test("adds 2 + 2 to equal 4", () => {
   expect(functions.add(2, 2)).toBe(4);
});
test("adds 2 + 2 Not equal 5", () => {
   expect(functions.add(2, 2)).not.toBe(5);
});

test("Should be null", () => {
   expect(functions.isNull()).toBeNull();
});

test("should be falsy", () => {
   expect(functions.checkValue(0)).toBeFalsy();
});

// to Equal
test("USer should be Brad Test Object", () => {
   expect(functions.createUser()).toEqual({
      firstName: "Brad",
      lastName: "Test"
   });
});

//was gibt es noch ? l
test("Kein I in Team", () => {
   expect("team").not.toMatch(/I/);
});

//Arrays
test("Admin shpuld be in username", () => {
   let usernames = ["john", "admin", "karen"];
   expect(usernames).toContain("admin");
});

// working with async data Promise
test("user fetched Name Leanne Graham", () => {
   expect.assertions(1);
   return functions.fetchUser().then(data => {
      expect(data.name).toEqual("Leanne Graham");
   });
});

// Async Await
test("user fetch Name LEanne Graham", async () => {
   expect.assertions(1);
   const data = await functions.fetchUser();
   expect(data.name).toEqual("Leanne Graham");
});
