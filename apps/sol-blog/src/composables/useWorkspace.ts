import { inject, provide, computed, ComputedRef, Ref } from "vue";
import { AnchorWallet, useAnchorWallet } from "solana-wallets-vue";
import { Connection, PublicKey, Commitment } from "@solana/web3.js";
import { Provider, Program } from "@project-serum/anchor";
import idl from "smart-contracts/target/idl/blog.json";

import { BlogProgram } from "types";

const workspaceSymbol = Symbol();

interface Workspace {
  program: ComputedRef<BlogProgram|undefined>;
  provider: ComputedRef<Provider|undefined>;
  connection: Connection;
  wallet: Ref<AnchorWallet|undefined>;
}

// set return type for useWorkspace
let workspace : Workspace | null  = null ;

export const useWorkspace = (): Workspace | null => workspace

const programID = new PublicKey("FMhy9h13c1HeKQfvgkYWg6HzhWDCoCexPqoq7vHC89xM");

export const initWorkspace = () => {
  const wallet  = useAnchorWallet();
  let commitment: Commitment = "processed";
  const opts = {
    preflightCommitment: commitment,
  };
  const connection = new Connection("https://api.devnet.solana.com:443");
  // const connection = new Connection("http://127.0.0.1:8899");

  const provider = computed(() => {
    // WorkAround for Wallet issue https://github.com/solana-labs/wallet-adapter/issues/244#issuecomment-1006049972
    let wallet_ = (wallet.value as unknown ) as AnchorWallet
    return new Provider(connection, wallet_, opts);
  });

  const program = computed(() => {
    if (provider.value == undefined) {
      return;
    }
    return (new Program(idl, programID, provider.value) as unknown) as BlogProgram;
  });

  workspace = {
    wallet,
    connection,
    provider,
    program,
  }
};

