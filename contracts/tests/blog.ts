import * as anchor from "@project-serum/anchor";
import { Program, web3 } from "@project-serum/anchor";
import assert from "assert";
import {
  createPost,
  postData,
  fetchPost,
  fetchPosts,
  updatePost,
  deletePost,
} from "api";
import { BlogProgram } from "types";
import { expect } from "chai";
describe("blog", async () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Blog as BlogProgram;
  // generate a new pubkey

  it("create post !", async () => {
    const postInput: postData = {
      title: "dummy post",
      content_ipfs_hash: Buffer.from(
        "QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u"
      ),
      banner_ipfs_hash: Buffer.from(
        "QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u"
      ),
    };
    await createPost(program, provider, postInput);
    let posts = await program.account.blogPost.all();
    const { account: post } = posts[0];
    expect(post.title).eq(postInput.title);

    // expect(post.contentIpfsHash).eq(postInput.content_ipfs_hash);
    // expect(post.bannerIpfsHash).eq(postInput.banner_ipfs_hash);
    expect(posts.length).eq(1);
  });

  it("fetch post", async () => {
    const postInput: postData = {
      title: "new post",
      content_ipfs_hash: Buffer.from(
        "QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u"
      ),
      banner_ipfs_hash: Buffer.from(
        "QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u"
      ),
    };

    const postPubKey = await createPost(program, provider, postInput);
    const post = await fetchPost(program, postPubKey.toString());
    expect(post.title).eq(postInput.title);

    console.log("post ipgs", post.contentIpfsHash as string);

    expect(post.contentIpfsHash.toString()).eq(
      postInput.content_ipfs_hash.toString()
    );
    expect(post.bannerIpfsHash.toString()).eq(
      postInput.banner_ipfs_hash.toString()
    );
  });

  it("fetch posts", async () => {
    const posts = await fetchPosts(program);
    expect(posts.length).eq(2);
  });

  it("update post", async () => {
    const postInput: postData = {
      title: "new post",
      content_ipfs_hash: Buffer.from(
        "QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u"
      ),
      banner_ipfs_hash: Buffer.from(
        "QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u"
      ),
    };

    const postId = await createPost(program, provider, postInput);
    postInput.title = "updated post";

    await updatePost(program, provider, postInput, postId.toString());

    const updatedPost = await fetchPost(program, postId.toString());

    expect(updatedPost.title).eq("updated post");
  });

  it("delete post", async () => {
    const len = (await program.account.blogPost.all()).length;
    const postInput: postData = {
      title: "new post",
      content_ipfs_hash: Buffer.from(
        "QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u"
      ),
      banner_ipfs_hash: Buffer.from(
        "QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u"
      ),
    };

    const postId = await createPost(program, provider, postInput);

    await deletePost(program, provider, postId.toString());
    const posts = await program.account.blogPost.all();

    expect(posts.length).eq(len);
  });
});
