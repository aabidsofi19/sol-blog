import { inject, provide, computed, ComputedRef, Ref } from "vue";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-vue";
import { Connection, PublicKey } from "@solana/web3.js";
import { Provider, Program } from "@project-serum/anchor";
import idl from "smart-contracts/target/idl/blog.json";
import { BlogProgram } from "types";

const workspaceSymbol = Symbol();

interface Workspace {
  program: ComputedRef<BlogProgram>;
  provider: ComputedRef<Provider>;
  connection: Connection;
  wallet: Ref<AnchorWallet>;
}

// set return type for useWorkspace

export const useWorkspace = (): Workspace | undefined =>
  inject(workspaceSymbol);

const programID = new PublicKey("Ab5jcLYJ5dQUarijL1JuRJMMo321PzF9HEpf5Br1v95K");

export const initWorkspace = () => {
  const wallet = useAnchorWallet();
  const opts = {
    preflightCommitment: "processed",
  };
  // const connection = new Connection("https://api.devnet.solana.com:443");
  const connection = new Connection("http://127.0.0.1:8899");
  const provider = computed(() => new Provider(connection, wallet.value, opts));
  const program: ComputedRef<BlogProgram> = computed(
    () => new Program(idl, programID, provider.value)
  );

  provide(workspaceSymbol, {
    wallet,
    connection,
    provider,
    program,
  });
};
