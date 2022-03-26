import * as anchor from "@project-serum/anchor";
import { Program, web3 } from "@project-serum/anchor";
import { Blog } from "../target/types/blog";
import assert from "assert";
import idl from "../target/idl/blog.json";

describe("blog", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Blog as Program<Blog>;

  const blogPostAccount = anchor.web3.Keypair.generate();

  const title = "dummy blog";
  const ipfs_content_hash = "QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u";
  const banner_hash = "QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u";
  it("create post !", async () => {
    let tx_id = await program.rpc.createPost(
      title,
      Buffer.from(banner_hash),
      Buffer.from(ipfs_content_hash),
      {
        accounts: {
          blogPost: blogPostAccount.publicKey,
          authority: provider.wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        },
        signers: [blogPostAccount],
      }
    );

    let posts = await program.account.blogPost.all();
    assert.equal(posts.length, 1);
  });

  it("get post !", async () => {
    let posts = await program.account.blogPost.all();
    let post = await program.account.blogPost.fetch(posts[0].publicKey);
    assert.equal(post.title, title);
  });

  it("update post !", async () => {
    let tx_id = await program.rpc.updatePost(
      "updated title",
      Buffer.from("QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u"),
      Buffer.from("QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u"),
      {
        accounts: {
          blogPost: blogPostAccount.publicKey,
          authority: provider.wallet.publicKey,
        },
        signers: [],
      }
    );

    let post = await program.account.blogPost.fetch(blogPostAccount.publicKey);

    assert.equal(post.title, "updated title");
  });
});
