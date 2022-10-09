import { buildSchema } from "graphql";

export const schema = buildSchema(`
  type Query {
    TestData: TestData
  }
  type TestData {
    text: String
    views: Int
  }
`);
