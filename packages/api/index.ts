import { SystemProgram } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { web3, Program, Provider, Accounts } from "@project-serum/anchor";

import { addFile } from "./ipfs";
import { createFile } from "helpers";

import {
  BlogPostAccount,
  BlogProgram,
  BlogPostInputInterface,
  AnchorFilter,
} from "types";

export const authorFilter = (authorBase58PublicKey: string): AnchorFilter => ({
  memcmp: {
    offset: 8, // Discriminator.
    bytes: authorBase58PublicKey,
  },
});

async function createPost(
  program: BlogProgram,
  provider: Provider,
  postData: BlogPostInputInterface
) {
  let file = await createFile(postData.content, postData.title);
  let content_ipfs_hash = Buffer.from(await addFile(file));
  let banner_ipfs_hash = Buffer.from(await addFile(postData.banner));
  let blogPostAccount = web3.Keypair.generate();
  console.log("banner hash", banner_ipfs_hash);
  let tx = await program.rpc.createPost(
    postData.title,
    banner_ipfs_hash,
    content_ipfs_hash,
    {
      accounts: {
        blogPost: blogPostAccount.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [blogPostAccount],
    }
  );
  console.log("Your transaction signature for createpost ", tx);
  return blogPostAccount;
}

async function fetchPosts(program: BlogProgram, filters: AnchorFilter[] = []) {
  let posts = await program.account.blogPost.all(filters);
  console.log("posts", posts);
  return posts;
}

async function fetchPost(program: BlogProgram, address: String) {
  let pubKey = new PublicKey(address);
  let post = await program.account.blogPost.fetch(pubKey);

  return post;
}

export { createPost, fetchPosts, fetchPost };
