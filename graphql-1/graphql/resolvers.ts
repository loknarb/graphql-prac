import {Resolvers, TestData} from './graphql'; 

export const resolvers: Resolvers = {
  // events: () => {
  //   return events;
  // },
  // Query: {
  //   TestData: (): TestData => {
  //     return {
  //       text: "This is a test",
  //       views: 123
  //     }
  //   }
  // },
  TestData: {
    text: () => 'Hello World!',
    views: () => 123
  }
};
