import assert from "assert";
import { addFile, getFile, createClient } from "api/ipfs";
import { createFile } from "helpers";

describe("ipfs add", function () {
  const test_content = "test content";
  const content_file = createFile(test_content, "test");
  it("should create a client", async () => {
    const client = createClient();
    assert.ok(client);
  });

  it("should add a file", async function () {
    const cid = await addFile(await content_file);
    assert.ok(cid);
  });

  it("should get a file", async function () {
    const cid = await addFile(test_content);
    const content = await getFile(cid);
    console.log(content);
    const contetn_string = content.toString();
    assert.equal(contetn_string, test_content);
  });
});
