import { SystemProgram } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import {
  web3,
  Program,
  Provider,
  Accounts,
  utils,
} from "@project-serum/anchor";

import { addFile } from "./ipfs";
import { createFile } from "helpers";

import {
  BlogPostAccount,
  BlogProgram,
  BlogPostInputInterface,
  AnchorFilter,
} from "types";
import { publicKey } from "@project-serum/anchor/dist/cjs/utils";

export const authorFilter = (authorBase58PublicKey: string): AnchorFilter => ({
  memcmp: {
    offset: 8, // Discriminator.
    bytes: authorBase58PublicKey,
  },
});

export async function generateCreatePostInput(
  postData: BlogPostInputInterface
) {
  let file = await createFile(postData.content, postData.title);
  let content_ipfs_hash = Buffer.from(await addFile(file));
  let banner_ipfs_hash = Buffer.from(await addFile(postData.banner));

  return {
    title: postData.title,
    content_ipfs_hash,
    banner_ipfs_hash,
  };
}

export interface postData {
  title: string;
  content_ipfs_hash: Buffer;
  banner_ipfs_hash: Buffer;
}

async function createPost(
  program: BlogProgram,
  provider: Provider,
  postData: postData
) {
  const { title, content_ipfs_hash, banner_ipfs_hash } = postData;
  const seedPubkey = web3.Keypair.generate().publicKey;
  let [blogPostAccountPDA, _] = await PublicKey.findProgramAddress(
    [
      utils.bytes.utf8.encode("blog-post"),
      provider.wallet.publicKey.toBuffer(),

      seedPubkey.toBuffer(),
    ],
    program.programId
  );
  let tx = await program.rpc.createPost(
    seedPubkey,
    title,
    banner_ipfs_hash,
    content_ipfs_hash,
    {
      accounts: {
        blogPost: blogPostAccountPDA,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [],
    }
  );
  return blogPostAccountPDA;
}

const updatePost = async (
  program: BlogProgram,
  provider: Provider,
  postData: postData,
  address: String
) => {
  const { title, content_ipfs_hash, banner_ipfs_hash } = postData;

  let tx = await program.rpc.updatePost(
    title,
    banner_ipfs_hash,
    content_ipfs_hash,
    {
      accounts: {
        blogPost: new PublicKey(address),
        authority: provider.wallet.publicKey,
      },
      signers: [],
    }
  );
  return tx;
};

async function fetchPosts(program: BlogProgram, filters: AnchorFilter[] = []) {
  let posts = await program.account.blogPost.all(filters);
  return posts;
}

async function fetchPost(program: BlogProgram, address: String) {
  let pubKey = new PublicKey(address);
  let post = await program.account.blogPost.fetch(pubKey);

  return post;
}

async function deletePost(
  program: BlogProgram,
  provider: Provider,
  address: String
) {
  let blogPost = new PublicKey(address);
  const tx = await program.rpc.deletePost({
    accounts: {
      blogPost: blogPost,
      authority: provider.wallet.publicKey,
    },
    signers: [],
  });

  return tx;
}

export { createPost, updatePost, fetchPosts, fetchPost, deletePost };
