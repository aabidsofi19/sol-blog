import { createFile, sluggify } from "./index";
import { expect } from "chai";
// test createfile functions . the function returns a file of type text for string
describe("createFile", () => {
  it("should return a file for string", async () => {
    let file = await createFile("test", "test");
    expect(file).instanceof(File);
    expect(file.type).equal("text/plain");
    expect(file.name).equal("test.txt");
    expect(file.text).equal("test");
  });
});

describe("sluggify", () => {
  it("should return a string", () => {
    let slug = sluggify("test");
    expect(slug).instanceof(String);
  });

  it("should return a string with a -", () => {
    let slug = sluggify("test test");
    expect(slug).instanceof(String);
    expect(slug).equal("test-test");
  });
});
