import axios from "axios";
export const functions = {
   add: (num1: number, num2: number): number => num1 + num2,
   isNull: () => null,
   checkValue: (x: any) => x,
   createUser: () => {
      const user = {
         firstName: "Brad",
         lastName: "Test"
      };
      return user;
   },
   fetchUser: async () => {
      let response = await axios.get(
         "https://jsonplaceholder.typicode.com/users/1"
      );

      return response.data;
   }
};
