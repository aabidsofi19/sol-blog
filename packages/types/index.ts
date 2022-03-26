import { IdlAccounts, Program } from "@project-serum/anchor";
import { Blog } from "./blog";

type BlogProgram = Program<Blog>;
type BlogProgramAccounts = IdlAccounts<Blog>;
type BlogPostAccount = BlogProgramAccounts["blogPost"];

interface BlogPostInputInterface {
  title: string;
  content: string;
  banner: File;
}

interface AnchorFilter {
  memcmp: {
    offset: number;
    bytes: string;
  };
}

export {
  type AnchorFilter,
  type BlogProgram,
  type BlogProgramAccounts,
  type BlogPostAccount,
  type BlogPostInputInterface,
};
